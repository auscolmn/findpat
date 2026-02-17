-- FindPAT Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE verification_tier AS ENUM ('listed', 'verified', 'certified');
CREATE TYPE verification_status AS ENUM ('pending', 'under_review', 'approved', 'rejected');
CREATE TYPE verification_method AS ENUM ('ahpra', 'resume', 'linkedin', 'professional_email', 'manual');
CREATE TYPE availability_status AS ENUM ('accepting', 'waitlist', 'not_accepting');
CREATE TYPE practitioner_role AS ENUM ('psychiatrist', 'psychologist', 'therapist', 'nurse', 'integration_coach');
CREATE TYPE onboarding_status AS ENUM ('not_started', 'basic_info', 'professional', 'training', 'specialties', 'bio', 'complete');

-- Profiles table (practitioner data)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  
  -- Basic Info (Step 1)
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  photo_url TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Australia',
  
  -- Professional Details (Step 2)
  role practitioner_role,
  license_type TEXT,
  workplace TEXT,
  workplace_website TEXT,
  ahpra_number TEXT,
  years_experience INTEGER,
  
  -- Specialties & Modalities (Step 4)
  modalities TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  
  -- Bio & Contact (Step 5)
  bio TEXT,
  website TEXT,
  booking_url TEXT,
  phone TEXT,
  accepts_direct_contact BOOLEAN DEFAULT true,
  languages TEXT[] DEFAULT '{English}',
  
  -- Collaboration
  looking_to_collaborate BOOLEAN DEFAULT false,
  collaboration_roles TEXT[] DEFAULT '{}',
  
  -- Status fields
  verification_tier verification_tier DEFAULT 'listed',
  availability availability_status DEFAULT 'not_accepting',
  onboarding_status onboarding_status DEFAULT 'not_started',
  
  -- Profile visibility
  is_published BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  
  -- Analytics
  profile_views INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  email_confirmed_at TIMESTAMPTZ
);

-- Training/Credentials table (Step 3)
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issued_at DATE,
  expires_at DATE,
  certificate_id TEXT,
  certificate_url TEXT,
  
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verifications table
CREATE TABLE verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  method verification_method NOT NULL,
  status verification_status DEFAULT 'pending',
  
  -- Method-specific data
  ahpra_number TEXT,
  ahpra_verified_name TEXT,
  ahpra_profession TEXT,
  
  linkedin_url TEXT,
  linkedin_data JSONB,
  
  professional_email TEXT,
  professional_email_domain TEXT,
  
  -- Review info
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  review_notes TEXT,
  
  -- Outcome
  approved BOOLEAN,
  rejection_reason TEXT
);

-- Documents table (uploaded files)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  verification_id UUID REFERENCES verifications(id) ON DELETE SET NULL,
  
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  
  document_type TEXT NOT NULL, -- 'resume', 'certificate', 'license', 'other'
  
  is_reviewed BOOLEAN DEFAULT false,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profile view analytics
CREATE TABLE profile_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_slug ON profiles(slug);
CREATE INDEX idx_profiles_verification_tier ON profiles(verification_tier);
CREATE INDEX idx_profiles_location ON profiles(city, state, country);
CREATE INDEX idx_profiles_modalities ON profiles USING GIN(modalities);
CREATE INDEX idx_profiles_specialties ON profiles USING GIN(specialties);
CREATE INDEX idx_profiles_published ON profiles(is_published) WHERE is_published = true;

CREATE INDEX idx_verifications_profile ON verifications(profile_id);
CREATE INDEX idx_verifications_status ON verifications(status);

CREATE INDEX idx_credentials_profile ON credentials(profile_id);

CREATE INDEX idx_documents_profile ON documents(profile_id);
CREATE INDEX idx_documents_verification ON documents(verification_id);

CREATE INDEX idx_profile_views_profile ON profile_views(profile_id);
CREATE INDEX idx_profile_views_date ON profile_views(viewed_at);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Credentials policies
CREATE POLICY "Public credentials for published profiles"
  ON credentials FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = credentials.profile_id AND profiles.is_published = true
  ));

CREATE POLICY "Users can view their own credentials"
  ON credentials FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage their own credentials"
  ON credentials FOR ALL
  USING (auth.uid() = profile_id);

-- Verifications policies
CREATE POLICY "Users can view their own verifications"
  ON verifications FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own verifications"
  ON verifications FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- Documents policies
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage their own documents"
  ON documents FOR ALL
  USING (auth.uid() = profile_id);

-- Profile views (insert only for analytics)
CREATE POLICY "Anyone can record a view"
  ON profile_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own analytics"
  ON profile_views FOR SELECT
  USING (auth.uid() = profile_id);

-- Functions
CREATE OR REPLACE FUNCTION increment_profile_views(p_profile_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles SET profile_views = profile_views + 1 WHERE id = p_profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(p_first_name TEXT, p_last_name TEXT, p_id UUID)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  base_slug := LOWER(REGEXP_REPLACE(COALESCE(p_first_name, '') || '-' || COALESCE(p_last_name, ''), '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  IF base_slug = '' OR base_slug = '-' THEN
    base_slug := 'practitioner';
  END IF;
  
  final_slug := base_slug;
  
  WHILE EXISTS (SELECT 1 FROM profiles WHERE slug = final_slug AND id != p_id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;
