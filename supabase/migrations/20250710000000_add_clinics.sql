-- Migration: Add clinic directory feature
-- This migration adds support for clinic/facility listings alongside individual practitioners

-- Create clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  
  -- Branding
  logo_url TEXT,
  hero_image_url TEXT,
  
  -- Description
  description TEXT,
  
  -- Location
  address TEXT,
  city TEXT,
  state TEXT,
  postcode TEXT,
  country TEXT DEFAULT 'AU',
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  
  -- Contact
  phone TEXT,
  email TEXT,
  website TEXT,
  booking_url TEXT,
  
  -- Services
  modalities TEXT[] DEFAULT '{}',
  treatment_types TEXT[] DEFAULT '{}',
  services_description TEXT,
  
  -- Insurance & Payment
  insurance_accepted TEXT[] DEFAULT '{}',
  bulk_billing_available BOOLEAN DEFAULT FALSE,
  
  -- Operating Hours (JSON)
  operating_hours JSONB,
  
  -- Business Info
  abn_number TEXT,
  
  -- Status
  verification_tier TEXT DEFAULT 'listed' CHECK (verification_tier IN ('listed', 'verified', 'certified')),
  is_published BOOLEAN DEFAULT FALSE,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  
  -- Analytics
  profile_views INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create clinic_practitioners junction table (many-to-many)
CREATE TABLE IF NOT EXISTS clinic_practitioners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Role at the clinic
  role TEXT, -- e.g., "Medical Director", "Lead Therapist"
  is_primary BOOLEAN DEFAULT FALSE, -- Primary contact for the clinic
  
  -- Status
  approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  
  -- Timestamps
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: each practitioner can only be linked once to each clinic
  UNIQUE(clinic_id, practitioner_id)
);

-- Create clinic_verifications table
CREATE TABLE IF NOT EXISTS clinic_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  
  -- ABN Verification
  abn_number TEXT,
  abn_verified BOOLEAN DEFAULT FALSE,
  abn_verified_at TIMESTAMPTZ,
  abn_business_name TEXT,
  
  -- Documents
  documents_submitted BOOLEAN DEFAULT FALSE,
  documents_reviewed BOOLEAN DEFAULT FALSE,
  documents_approved BOOLEAN DEFAULT FALSE,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  
  -- Review
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT
);

-- Add clinic affiliation to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS clinic_role TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clinics_owner_id ON clinics(owner_id);
CREATE INDEX IF NOT EXISTS idx_clinics_slug ON clinics(slug);
CREATE INDEX IF NOT EXISTS idx_clinics_city ON clinics(city);
CREATE INDEX IF NOT EXISTS idx_clinics_state ON clinics(state);
CREATE INDEX IF NOT EXISTS idx_clinics_verification_tier ON clinics(verification_tier);
CREATE INDEX IF NOT EXISTS idx_clinics_is_published ON clinics(is_published);
CREATE INDEX IF NOT EXISTS idx_clinics_modalities ON clinics USING GIN(modalities);
CREATE INDEX IF NOT EXISTS idx_clinics_treatment_types ON clinics USING GIN(treatment_types);
CREATE INDEX IF NOT EXISTS idx_clinics_insurance_accepted ON clinics USING GIN(insurance_accepted);

CREATE INDEX IF NOT EXISTS idx_clinic_practitioners_clinic_id ON clinic_practitioners(clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_practitioners_practitioner_id ON clinic_practitioners(practitioner_id);

CREATE INDEX IF NOT EXISTS idx_clinic_verifications_clinic_id ON clinic_verifications(clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_verifications_status ON clinic_verifications(status);

CREATE INDEX IF NOT EXISTS idx_profiles_clinic_id ON profiles(clinic_id);

-- Enable RLS
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clinics

-- Anyone can view published clinics
CREATE POLICY "Published clinics are viewable by everyone"
  ON clinics FOR SELECT
  USING (is_published = TRUE);

-- Owners can view their own clinics (published or not)
CREATE POLICY "Clinic owners can view their clinics"
  ON clinics FOR SELECT
  USING (auth.uid() = owner_id);

-- Owners can insert their own clinics
CREATE POLICY "Users can create clinics"
  ON clinics FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own clinics
CREATE POLICY "Clinic owners can update their clinics"
  ON clinics FOR UPDATE
  USING (auth.uid() = owner_id);

-- Owners can delete their own clinics
CREATE POLICY "Clinic owners can delete their clinics"
  ON clinics FOR DELETE
  USING (auth.uid() = owner_id);

-- RLS Policies for clinic_practitioners

-- Anyone can view approved practitioner-clinic links
CREATE POLICY "Approved clinic practitioners are viewable"
  ON clinic_practitioners FOR SELECT
  USING (approved = TRUE);

-- Clinic owners can view all their clinic's practitioners
CREATE POLICY "Clinic owners can view all practitioners"
  ON clinic_practitioners FOR SELECT
  USING (
    clinic_id IN (SELECT id FROM clinics WHERE owner_id = auth.uid())
  );

-- Practitioners can view their own links
CREATE POLICY "Practitioners can view their own links"
  ON clinic_practitioners FOR SELECT
  USING (practitioner_id = auth.uid());

-- Clinic owners can manage practitioners
CREATE POLICY "Clinic owners can manage practitioners"
  ON clinic_practitioners FOR ALL
  USING (
    clinic_id IN (SELECT id FROM clinics WHERE owner_id = auth.uid())
  );

-- RLS Policies for clinic_verifications

-- Clinic owners can view their verification status
CREATE POLICY "Clinic owners can view their verifications"
  ON clinic_verifications FOR SELECT
  USING (
    clinic_id IN (SELECT id FROM clinics WHERE owner_id = auth.uid())
  );

-- Clinic owners can submit verifications
CREATE POLICY "Clinic owners can submit verifications"
  ON clinic_verifications FOR INSERT
  WITH CHECK (
    clinic_id IN (SELECT id FROM clinics WHERE owner_id = auth.uid())
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_clinic_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER clinics_updated_at
  BEFORE UPDATE ON clinics
  FOR EACH ROW
  EXECUTE FUNCTION update_clinic_updated_at();

-- Function to increment clinic profile views
CREATE OR REPLACE FUNCTION increment_clinic_views(clinic_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE clinics 
  SET profile_views = profile_views + 1 
  WHERE id = clinic_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
