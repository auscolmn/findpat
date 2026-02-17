-- FindPAT Reviews & Outcomes Schema
-- Migration: 002_reviews.sql

-- Enum types for reviews
CREATE TYPE outcome_rating AS ENUM (
  'life_changing',
  'significant_improvement', 
  'moderate_improvement',
  'slight_improvement',
  'no_change',
  'got_worse'
);

CREATE TYPE treatment_type AS ENUM (
  'mdma',
  'psilocybin', 
  'ketamine',
  'lsd',
  'cannabis',
  'ayahuasca',
  'ibogaine',
  '5-meo-dmt',
  'other'
);

CREATE TYPE condition_treated AS ENUM (
  'ptsd',
  'depression',
  'anxiety',
  'addiction',
  'trauma',
  'end_of_life',
  'ocd',
  'eating_disorder',
  'chronic_pain',
  'relationship_issues',
  'spiritual_exploration',
  'other'
);

CREATE TYPE review_status AS ENUM (
  'pending',      -- Awaiting moderation
  'approved',     -- Visible on profile
  'rejected',     -- Did not pass moderation
  'flagged'       -- Practitioner flagged for review
);

-- Review tokens table (for secure review links)
CREATE TABLE review_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practitioner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  
  -- Optional client email (for verification)
  client_email TEXT,
  
  -- Usage tracking
  is_used BOOLEAN DEFAULT false,
  used_at TIMESTAMPTZ,
  
  -- Expiry
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practitioner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  outcome_rating outcome_rating NOT NULL,
  treatment_type treatment_type NOT NULL,
  condition_treated condition_treated NOT NULL,
  review_text TEXT,
  would_recommend BOOLEAN NOT NULL,
  
  -- Treatment date (month/year only for privacy)
  treatment_month INTEGER CHECK (treatment_month >= 1 AND treatment_month <= 12),
  treatment_year INTEGER CHECK (treatment_year >= 2000 AND treatment_year <= 2100),
  
  -- Verification & moderation
  token_id UUID REFERENCES review_tokens(id) ON DELETE SET NULL,
  is_verified BOOLEAN DEFAULT false,
  status review_status DEFAULT 'pending',
  
  -- Moderation
  moderated_at TIMESTAMPTZ,
  moderated_by UUID,
  moderation_notes TEXT,
  
  -- Practitioner response
  practitioner_response TEXT,
  response_at TIMESTAMPTZ,
  
  -- Privacy: no client info stored except optional hash for dedup
  client_hash TEXT, -- SHA256 of email if provided, for preventing duplicates
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aggregate stats cache (updated by trigger)
CREATE TABLE practitioner_review_stats (
  practitioner_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Counts
  total_reviews INTEGER DEFAULT 0,
  approved_reviews INTEGER DEFAULT 0,
  
  -- Ratings
  average_rating NUMERIC(3,2),
  
  -- Outcome breakdown (stored as JSON for flexibility)
  outcome_counts JSONB DEFAULT '{}',
  
  -- Condition breakdown
  condition_counts JSONB DEFAULT '{}',
  
  -- Treatment type breakdown
  treatment_counts JSONB DEFAULT '{}',
  
  -- Recommendation rate
  recommendation_rate NUMERIC(5,2),
  
  -- Last updated
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_review_tokens_token ON review_tokens(token);
CREATE INDEX idx_review_tokens_practitioner ON review_tokens(practitioner_id);
CREATE INDEX idx_review_tokens_expires ON review_tokens(expires_at);

CREATE INDEX idx_reviews_practitioner ON reviews(practitioner_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created ON reviews(created_at);
CREATE INDEX idx_reviews_outcome ON reviews(outcome_rating);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Row Level Security
ALTER TABLE review_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_review_stats ENABLE ROW LEVEL SECURITY;

-- Review tokens policies
CREATE POLICY "Practitioners can manage their own tokens"
  ON review_tokens FOR ALL
  USING (auth.uid() = practitioner_id);

-- Reviews policies
CREATE POLICY "Approved reviews are visible to everyone"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Practitioners can view all their reviews"
  ON reviews FOR SELECT
  USING (auth.uid() = practitioner_id);

CREATE POLICY "Anyone can insert reviews via valid token"
  ON reviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM review_tokens 
      WHERE review_tokens.id = reviews.token_id 
      AND review_tokens.is_used = false
      AND review_tokens.expires_at > NOW()
    )
    OR token_id IS NULL -- Allow anonymous reviews too
  );

CREATE POLICY "Practitioners can respond to their reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = practitioner_id)
  WITH CHECK (auth.uid() = practitioner_id);

-- Review stats policies
CREATE POLICY "Review stats are public"
  ON practitioner_review_stats FOR SELECT
  USING (true);

-- Function to update review stats
CREATE OR REPLACE FUNCTION update_practitioner_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalculate stats for the practitioner
  INSERT INTO practitioner_review_stats (
    practitioner_id,
    total_reviews,
    approved_reviews,
    average_rating,
    outcome_counts,
    condition_counts,
    treatment_counts,
    recommendation_rate,
    updated_at
  )
  SELECT 
    COALESCE(NEW.practitioner_id, OLD.practitioner_id),
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'approved'),
    ROUND(AVG(rating) FILTER (WHERE status = 'approved'), 2),
    jsonb_object_agg(
      outcome_rating::text, 
      cnt
    ) FILTER (WHERE status = 'approved'),
    jsonb_object_agg(
      condition_treated::text,
      cond_cnt  
    ) FILTER (WHERE status = 'approved'),
    jsonb_object_agg(
      treatment_type::text,
      treat_cnt
    ) FILTER (WHERE status = 'approved'),
    ROUND(
      (COUNT(*) FILTER (WHERE would_recommend = true AND status = 'approved')::NUMERIC / 
       NULLIF(COUNT(*) FILTER (WHERE status = 'approved'), 0)) * 100, 
      2
    ),
    NOW()
  FROM (
    SELECT 
      r.*,
      COUNT(*) OVER (PARTITION BY outcome_rating) as cnt,
      COUNT(*) OVER (PARTITION BY condition_treated) as cond_cnt,
      COUNT(*) OVER (PARTITION BY treatment_type) as treat_cnt
    FROM reviews r
    WHERE r.practitioner_id = COALESCE(NEW.practitioner_id, OLD.practitioner_id)
  ) subq
  GROUP BY practitioner_id
  ON CONFLICT (practitioner_id) 
  DO UPDATE SET
    total_reviews = EXCLUDED.total_reviews,
    approved_reviews = EXCLUDED.approved_reviews,
    average_rating = EXCLUDED.average_rating,
    outcome_counts = EXCLUDED.outcome_counts,
    condition_counts = EXCLUDED.condition_counts,
    treatment_counts = EXCLUDED.treatment_counts,
    recommendation_rate = EXCLUDED.recommendation_rate,
    updated_at = NOW();
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for stats updates
CREATE TRIGGER update_review_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_practitioner_review_stats();

-- Function to generate review token
CREATE OR REPLACE FUNCTION generate_review_token(p_practitioner_id UUID, p_client_email TEXT DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
  v_token TEXT;
BEGIN
  -- Generate a URL-safe token
  v_token := encode(gen_random_bytes(24), 'base64');
  v_token := replace(replace(replace(v_token, '+', '-'), '/', '_'), '=', '');
  
  INSERT INTO review_tokens (practitioner_id, token, client_email)
  VALUES (p_practitioner_id, v_token, p_client_email);
  
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark token as used
CREATE OR REPLACE FUNCTION use_review_token(p_token TEXT)
RETURNS UUID AS $$
DECLARE
  v_token_id UUID;
BEGIN
  UPDATE review_tokens 
  SET is_used = true, used_at = NOW()
  WHERE token = p_token 
    AND is_used = false 
    AND expires_at > NOW()
  RETURNING id INTO v_token_id;
  
  RETURN v_token_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for review updated_at
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
