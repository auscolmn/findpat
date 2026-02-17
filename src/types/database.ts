// Database types for Supabase

export type VerificationTierDB = 'listed' | 'verified' | 'certified';
export type VerificationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';
export type VerificationMethod = 'ahpra' | 'resume' | 'linkedin' | 'professional_email' | 'manual';
export type AvailabilityStatusDB = 'accepting' | 'waitlist' | 'not_accepting';
export type PractitionerRoleDB = 'psychiatrist' | 'psychologist' | 'therapist' | 'nurse' | 'integration_coach';
export type ServiceTypeDB = 'dosing' | 'integration';
export type CoverageTypeDB = 'medicare' | 'dva' | 'phi';
export type OnboardingStatus = 'not_started' | 'basic_info' | 'professional' | 'services' | 'training' | 'specialties' | 'bio' | 'complete';

export interface Profile {
  id: string;
  email: string;
  
  // Basic Info
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  photo_url: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  
  // Professional Details
  role: PractitionerRoleDB | null;
  license_type: string | null;
  workplace: string | null;
  workplace_website: string | null;
  ahpra_number: string | null;
  years_experience: number | null;
  
  // Services & Coverage
  service_types: ServiceTypeDB[];
  coverage: CoverageTypeDB[];
  
  // Specialties & Modalities
  modalities: string[];
  specialties: string[];
  
  // Bio & Contact
  bio: string | null;
  website: string | null;
  booking_url: string | null;
  phone: string | null;
  accepts_direct_contact: boolean;
  languages: string[];
  
  // Collaboration
  looking_to_collaborate: boolean;
  collaboration_roles: string[];
  
  // Status
  verification_tier: VerificationTierDB;
  availability: AvailabilityStatusDB;
  onboarding_status: OnboardingStatus;
  is_published: boolean;
  slug: string | null;
  
  // Analytics
  profile_views: number;
  
  // Clinic affiliation
  clinic_id: string | null;
  clinic_role: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  email_confirmed_at: string | null;
}

export interface Credential {
  id: string;
  profile_id: string;
  name: string;
  issuer: string;
  issued_at: string | null;
  expires_at: string | null;
  certificate_id: string | null;
  certificate_url: string | null;
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
}

export interface Verification {
  id: string;
  profile_id: string;
  method: VerificationMethod;
  status: VerificationStatus;
  
  ahpra_number: string | null;
  ahpra_verified_name: string | null;
  ahpra_profession: string | null;
  
  linkedin_url: string | null;
  linkedin_data: Record<string, unknown> | null;
  
  professional_email: string | null;
  professional_email_domain: string | null;
  
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
  
  approved: boolean | null;
  rejection_reason: string | null;
}

export interface Document {
  id: string;
  profile_id: string;
  verification_id: string | null;
  file_name: string;
  file_type: string;
  file_size: number | null;
  storage_path: string;
  document_type: 'resume' | 'certificate' | 'license' | 'other';
  is_reviewed: boolean;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
}

export interface ProfileView {
  id: string;
  profile_id: string;
  viewer_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  viewed_at: string;
}

// Input types for forms
export interface BasicInfoInput {
  first_name: string;
  last_name: string;
  display_name?: string;
  city: string;
  state: string;
  country?: string;
}

export interface ProfessionalInput {
  role: PractitionerRoleDB;
  license_type?: string;
  workplace?: string;
  workplace_website?: string;
  ahpra_number?: string;
  years_experience?: number;
}

export interface SpecialtiesInput {
  modalities: string[];
  specialties: string[];
}

export interface BioInput {
  bio: string;
  website?: string;
  booking_url?: string;
  phone?: string;
  accepts_direct_contact: boolean;
  languages: string[];
  availability: AvailabilityStatusDB;
  looking_to_collaborate: boolean;
  collaboration_roles?: string[];
}
