import { VerificationTier, Modality, Practitioner } from './index';

export type TreatmentType = 'individual' | 'group' | 'couples' | 'family' | 'retreat';
export type InsuranceAccepted = 'medicare' | 'dva' | 'private_health' | 'ndis' | 'workers_comp';
export type ClinicVerificationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface ClinicLocation {
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface OperatingHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

export interface Clinic {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  heroImageUrl?: string;
  description: string;
  location: ClinicLocation;
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  
  // Services
  modalities: Modality[];
  treatmentTypes: TreatmentType[];
  servicesDescription?: string;
  
  // Insurance & Payment
  insuranceAccepted: InsuranceAccepted[];
  bulkBillingAvailable: boolean;
  
  // Operating Info
  operatingHours?: OperatingHours;
  
  // Verification
  verificationTier: VerificationTier;
  abnNumber?: string;
  
  // Team
  teamMembers?: ClinicPractitioner[];
  
  // Meta
  createdAt: string;
  updatedAt: string;
}

export interface ClinicPractitioner {
  practitionerId: string;
  clinicId: string;
  role?: string; // e.g., "Medical Director", "Lead Therapist"
  isPrimary: boolean;
  practitioner?: Practitioner;
}

// Database types
export interface ClinicDB {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  hero_image_url: string | null;
  description: string | null;
  
  // Location
  address: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  country: string;
  lat: number | null;
  lng: number | null;
  
  // Contact
  phone: string | null;
  email: string | null;
  website: string | null;
  booking_url: string | null;
  
  // Services
  modalities: string[];
  treatment_types: string[];
  services_description: string | null;
  
  // Insurance & Payment
  insurance_accepted: string[];
  bulk_billing_available: boolean;
  
  // Operating Hours (JSON)
  operating_hours: OperatingHours | null;
  
  // Business Info
  abn_number: string | null;
  
  // Status
  verification_tier: VerificationTier;
  is_published: boolean;
  onboarding_complete: boolean;
  
  // Analytics
  profile_views: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ClinicPractitionerDB {
  id: string;
  clinic_id: string;
  practitioner_id: string;
  role: string | null;
  is_primary: boolean;
  joined_at: string;
  approved: boolean;
  approved_at: string | null;
  approved_by: string | null;
}

export interface ClinicVerificationDB {
  id: string;
  clinic_id: string;
  abn_number: string | null;
  abn_verified: boolean;
  abn_verified_at: string | null;
  abn_business_name: string | null;
  
  documents_submitted: boolean;
  documents_reviewed: boolean;
  documents_approved: boolean;
  
  status: ClinicVerificationStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
}

// Labels
export const TREATMENT_TYPE_LABELS: Record<TreatmentType, string> = {
  individual: 'Individual Therapy',
  group: 'Group Sessions',
  couples: 'Couples Therapy',
  family: 'Family Therapy',
  retreat: 'Retreat Programs',
};

export const INSURANCE_LABELS: Record<InsuranceAccepted, string> = {
  medicare: 'Medicare',
  dva: 'DVA',
  private_health: 'Private Health Insurance',
  ndis: 'NDIS',
  workers_comp: "Workers' Compensation",
};

// Search filters for clinics
export interface ClinicSearchFilters {
  location?: string;
  state?: string;
  modalities?: Modality[];
  treatmentTypes?: TreatmentType[];
  insuranceAccepted?: InsuranceAccepted[];
  verificationTiers?: VerificationTier[];
}
