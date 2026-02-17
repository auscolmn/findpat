export type VerificationTier = 'listed' | 'verified' | 'certified';
export type Availability = 'accepting' | 'waitlist' | 'not_accepting';
export type PractitionerRole = 'psychiatrist' | 'psychologist' | 'therapist' | 'nurse' | 'integration_coach';
export type Modality = 'mdma' | 'psilocybin' | 'ketamine' | 'lsd' | 'cannabis' | 'ayahuasca' | 'ibogaine' | '5-meo-dmt';
export type Specialty = 'trauma' | 'ptsd' | 'depression' | 'anxiety' | 'addiction' | 'end_of_life' | 'couples' | 'spiritual' | 'eating_disorders' | 'ocd' | 'chronic_pain';

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
  lookingToCollaborate?: boolean;
  collaborationRoles?: PractitionerRole[];
  website?: string;
  bookingUrl?: string;
  credentials: Credential[];
  languages?: string[];
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
