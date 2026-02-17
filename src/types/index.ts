export type VerificationTier = 'listed' | 'verified' | 'certified';

// Re-export clinic types
export * from './clinic';
export type Availability = 'accepting' | 'waitlist' | 'not_accepting';
export type PractitionerRole = 'psychiatrist' | 'psychologist' | 'therapist' | 'nurse' | 'integration_coach';
export type Modality = 'mdma' | 'psilocybin' | 'ketamine' | 'lsd' | 'cannabis' | 'ayahuasca' | 'ibogaine' | '5-meo-dmt';
export type Specialty = 'trauma' | 'ptsd' | 'depression' | 'anxiety' | 'addiction' | 'end_of_life' | 'couples' | 'spiritual' | 'eating_disorders' | 'ocd' | 'chronic_pain';
export type ServiceType = 'dosing' | 'integration';
export type CoverageType = 'medicare' | 'dva' | 'phi';

export interface Practitioner {
  id: string;
  slug: string;
  name: string;
  photoUrl?: string;
  bio: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  role: PractitionerRole;
  licenseType?: string;
  yearsExperience?: number;
  verificationTier: VerificationTier;
  availability: Availability;
  modalities: Modality[];
  specialties: Specialty[];
  serviceTypes: ServiceType[];
  coverage: CoverageType[];
  lookingToCollaborate?: boolean;
  collaborationRoles?: PractitionerRole[];
  website?: string;
  bookingUrl?: string;
  credentials: Credential[];
  languages?: string[];
  // Clinic affiliation
  clinicId?: string;
  clinicName?: string;
  clinicSlug?: string;
  clinicRole?: string;
}

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  status: 'active' | 'expired' | 'revoked';
  certificateId?: string;
}

export interface SearchFilters {
  userType: 'client' | 'practitioner';
  location?: string;
  modalities?: Modality[];
  specialties?: Specialty[];
  roles?: PractitionerRole[];
  verificationTiers?: VerificationTier[];
  availability?: Availability[];
  serviceTypes?: ServiceType[];
  coverage?: CoverageType[];
  lookingToCollaborate?: boolean;
}

export const MODALITY_LABELS: Record<Modality, string> = {
  mdma: 'MDMA',
  psilocybin: 'Psilocybin',
  ketamine: 'Ketamine',
  lsd: 'LSD',
  cannabis: 'Cannabis',
  ayahuasca: 'Ayahuasca',
  ibogaine: 'Ibogaine',
  '5-meo-dmt': '5-MeO-DMT',
};

export const SPECIALTY_LABELS: Record<Specialty, string> = {
  trauma: 'Trauma & PTSD',
  ptsd: 'PTSD',
  depression: 'Depression',
  anxiety: 'Anxiety',
  addiction: 'Addiction & Recovery',
  end_of_life: 'End-of-Life',
  couples: 'Couples & Relationships',
  spiritual: 'Spiritual Exploration',
  eating_disorders: 'Eating Disorders',
  ocd: 'OCD',
  chronic_pain: 'Chronic Pain',
};

export const ROLE_LABELS: Record<PractitionerRole, string> = {
  psychiatrist: 'Psychiatrist',
  psychologist: 'Psychologist',
  therapist: 'Therapist / Counselor',
  nurse: 'Nurse Practitioner',
  integration_coach: 'Integration Coach',
};

export const TIER_LABELS: Record<VerificationTier, string> = {
  listed: 'Listed',
  verified: 'Verified',
  certified: 'Certified',
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  accepting: 'Accepting New Clients',
  waitlist: 'Waitlist Only',
  not_accepting: 'Not Accepting',
};

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  dosing: 'Dosing Sessions',
  integration: 'Integration Therapy',
};

export const SERVICE_TYPE_CONFIG: Record<ServiceType, { label: string; description: string; emoji: string }> = {
  dosing: {
    label: 'Dosing Sessions',
    description: 'Administering psychedelic-assisted therapy sessions',
    emoji: '⚡',
  },
  integration: {
    label: 'Integration Therapy',
    description: 'Preparation and post-session integration support',
    emoji: '🌱',
  },
};

export const COVERAGE_LABELS: Record<CoverageType, string> = {
  medicare: 'Medicare',
  dva: 'DVA',
  phi: 'Private Health',
};

export const COVERAGE_CONFIG: Record<CoverageType, { label: string; emoji: string; color: string }> = {
  medicare: { label: 'Medicare', emoji: '💚', color: 'bg-green-100 text-green-700 border-green-200' },
  dva: { label: 'DVA', emoji: '🏥', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  phi: { label: 'PHI Accepted', emoji: '🛡️', color: 'bg-purple-100 text-purple-700 border-purple-200' },
};
