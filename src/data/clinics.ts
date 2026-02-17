import { Clinic, ClinicSearchFilters, TreatmentType, InsuranceAccepted } from '@/types/clinic';
import { Modality, VerificationTier } from '@/types';

export const sampleClinics: Clinic[] = [
  {
    id: 'clinic-1',
    slug: 'psychedelic-medicine-institute',
    name: 'Psychedelic Medicine Institute',
    logoUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop',
    description: `Australia's leading psychedelic-assisted therapy centre, offering evidence-based treatments in a world-class facility. Our multidisciplinary team combines psychiatric expertise with compassionate therapeutic support.

We specialise in MDMA-assisted therapy for PTSD, psilocybin therapy for treatment-resistant depression, and ketamine infusion therapy. Our integrative approach ensures comprehensive care before, during, and after each treatment session.`,
    location: {
      address: '123 Collins Street, Level 15',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'AU',
      lat: -37.8136,
      lng: 144.9631,
    },
    phone: '(03) 9000 1234',
    email: 'contact@pmi.com.au',
    website: 'https://pmi.com.au',
    bookingUrl: 'https://pmi.com.au/book',
    modalities: ['mdma', 'psilocybin', 'ketamine'],
    treatmentTypes: ['individual', 'group', 'couples'],
    servicesDescription: 'Full spectrum psychedelic-assisted therapy including preparation, medicine sessions, and integration support.',
    insuranceAccepted: ['medicare', 'private_health', 'dva'],
    bulkBillingAvailable: false,
    operatingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '17:00' },
    },
    verificationTier: 'certified',
    abnNumber: '12 345 678 901',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20',
  },
  {
    id: 'clinic-2',
    slug: 'sydney-ketamine-clinic',
    name: 'Sydney Ketamine Clinic',
    logoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=400&fit=crop',
    description: `Specialising in ketamine-assisted therapy for depression, anxiety, and chronic pain. Our evidence-based protocols are delivered by experienced psychiatrists and psychologists in a safe, supportive environment.

Located in the heart of Sydney CBD, we offer flexible appointment times to accommodate busy schedules. Our comprehensive treatment programs include thorough assessment, supervised ketamine sessions, and ongoing integration therapy.`,
    location: {
      address: '456 George Street, Suite 800',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'AU',
      lat: -33.8688,
      lng: 151.2093,
    },
    phone: '(02) 9000 5678',
    email: 'info@sydneyketamine.com.au',
    website: 'https://sydneyketamine.com.au',
    bookingUrl: 'https://sydneyketamine.com.au/appointments',
    modalities: ['ketamine'],
    treatmentTypes: ['individual'],
    servicesDescription: 'Ketamine infusion therapy and intramuscular ketamine-assisted psychotherapy.',
    insuranceAccepted: ['medicare', 'private_health'],
    bulkBillingAvailable: true,
    operatingHours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '16:00' },
    },
    verificationTier: 'verified',
    abnNumber: '98 765 432 109',
    createdAt: '2024-02-20',
    updatedAt: '2024-06-15',
  },
  {
    id: 'clinic-3',
    slug: 'mindful-healing-centre',
    name: 'Mindful Healing Centre',
    logoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
    description: `A holistic treatment centre combining traditional psychotherapy with emerging psychedelic-assisted approaches. We focus on treating the whole person—mind, body, and spirit.

Our retreat-style setting on the Gold Coast provides a peaceful environment for deep healing work. We offer extended treatment programs, including multi-day retreat experiences and ongoing outpatient care.`,
    location: {
      address: '78 Ocean Drive',
      city: 'Gold Coast',
      state: 'QLD',
      postcode: '4217',
      country: 'AU',
      lat: -28.0027,
      lng: 153.4302,
    },
    phone: '(07) 5500 9012',
    email: 'hello@mindfulhealing.com.au',
    website: 'https://mindfulhealing.com.au',
    modalities: ['psilocybin', 'ketamine'],
    treatmentTypes: ['individual', 'group', 'retreat'],
    servicesDescription: 'Retreat-style psychedelic therapy programs with accommodation. Individual and group formats available.',
    insuranceAccepted: ['private_health', 'ndis'],
    bulkBillingAvailable: false,
    operatingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '10:00', close: '14:00' },
    },
    verificationTier: 'verified',
    abnNumber: '55 444 333 222',
    createdAt: '2024-03-10',
    updatedAt: '2024-06-18',
  },
  {
    id: 'clinic-4',
    slug: 'perth-trauma-centre',
    name: 'Perth Trauma Centre',
    logoUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&h=400&fit=crop',
    description: `Dedicated to helping trauma survivors heal through evidence-based therapies including MDMA-assisted psychotherapy. Our team has extensive experience working with veterans, first responders, and survivors of abuse.

We provide a trauma-informed environment with carefully designed spaces to promote safety and healing. Our comprehensive approach includes thorough assessment, preparation sessions, medicine-assisted therapy, and extended integration support.`,
    location: {
      address: '234 St Georges Terrace',
      city: 'Perth',
      state: 'WA',
      postcode: '6000',
      country: 'AU',
      lat: -31.9505,
      lng: 115.8605,
    },
    phone: '(08) 9000 3456',
    email: 'support@perthtrauma.com.au',
    website: 'https://perthtrauma.com.au',
    bookingUrl: 'https://perthtrauma.com.au/enquire',
    modalities: ['mdma', 'ketamine'],
    treatmentTypes: ['individual', 'couples'],
    servicesDescription: 'Specialised trauma treatment including MDMA-assisted therapy for PTSD and complex trauma.',
    insuranceAccepted: ['medicare', 'dva', 'workers_comp'],
    bulkBillingAvailable: false,
    operatingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '15:00' },
    },
    verificationTier: 'certified',
    abnNumber: '11 222 333 444',
    createdAt: '2024-01-25',
    updatedAt: '2024-06-22',
  },
  {
    id: 'clinic-5',
    slug: 'brisbane-mental-wellness',
    name: 'Brisbane Mental Wellness',
    logoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop',
    description: `A progressive psychiatric clinic offering cutting-edge treatments for mental health conditions. We combine conventional psychiatric care with ketamine therapy and are participating in psilocybin therapy research.

Our multidisciplinary team includes psychiatrists, psychologists, and specialist nurses working together to provide comprehensive care. We accept most major health insurance and offer flexible payment options.`,
    location: {
      address: '567 Ann Street',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'AU',
      lat: -27.4698,
      lng: 153.0251,
    },
    phone: '(07) 3000 7890',
    email: 'clinic@brisbanewellness.com.au',
    website: 'https://brisbanewellness.com.au',
    modalities: ['ketamine', 'psilocybin'],
    treatmentTypes: ['individual', 'group'],
    servicesDescription: 'Psychiatric assessment, medication management, ketamine therapy, and participation in psilocybin clinical trials.',
    insuranceAccepted: ['medicare', 'private_health', 'dva', 'ndis'],
    bulkBillingAvailable: true,
    operatingHours: {
      monday: { open: '08:30', close: '17:30' },
      tuesday: { open: '08:30', close: '17:30' },
      wednesday: { open: '08:30', close: '17:30' },
      thursday: { open: '08:30', close: '19:00' },
      friday: { open: '08:30', close: '17:00' },
    },
    verificationTier: 'listed',
    createdAt: '2024-04-05',
    updatedAt: '2024-06-10',
  },
  {
    id: 'clinic-6',
    slug: 'adelaide-integrative-psych',
    name: 'Adelaide Integrative Psychiatry',
    logoUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=200&h=200&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=400&fit=crop',
    description: `Integrating conventional psychiatry with complementary approaches including ketamine-assisted therapy. Our clinic specialises in treatment-resistant depression and anxiety disorders.

Located in Adelaide's Eastern suburbs, we offer a calm, private setting for your healing journey. Our approach combines medication management with psychotherapy and lifestyle interventions for lasting results.`,
    location: {
      address: '89 Greenhill Road',
      city: 'Adelaide',
      state: 'SA',
      postcode: '5034',
      country: 'AU',
      lat: -34.9285,
      lng: 138.6007,
    },
    phone: '(08) 8000 4567',
    email: 'info@adelaidepsych.com.au',
    website: 'https://adelaidepsych.com.au',
    bookingUrl: 'https://adelaidepsych.com.au/book',
    modalities: ['ketamine'],
    treatmentTypes: ['individual'],
    servicesDescription: 'Psychiatric assessment, ketamine infusion therapy, and integrative treatment approaches.',
    insuranceAccepted: ['medicare', 'private_health'],
    bulkBillingAvailable: false,
    operatingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '16:00' },
    },
    verificationTier: 'verified',
    abnNumber: '66 777 888 999',
    createdAt: '2024-03-28',
    updatedAt: '2024-06-12',
  },
];

export function searchClinics(
  clinics: Clinic[],
  filters: ClinicSearchFilters
): Clinic[] {
  return clinics.filter((clinic) => {
    // Location filter (city or state)
    if (filters.location) {
      const locationStr = `${clinic.location.city} ${clinic.location.state} ${clinic.location.postcode}`.toLowerCase();
      if (!locationStr.includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // State filter
    if (filters.state) {
      if (clinic.location.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
    }

    // Modalities filter
    if (filters.modalities && filters.modalities.length > 0) {
      if (!filters.modalities.some((m) => clinic.modalities.includes(m))) {
        return false;
      }
    }

    // Treatment types filter
    if (filters.treatmentTypes && filters.treatmentTypes.length > 0) {
      if (!filters.treatmentTypes.some((t) => clinic.treatmentTypes.includes(t))) {
        return false;
      }
    }

    // Insurance filter
    if (filters.insuranceAccepted && filters.insuranceAccepted.length > 0) {
      if (!filters.insuranceAccepted.some((i) => clinic.insuranceAccepted.includes(i))) {
        return false;
      }
    }

    // Verification tier filter
    if (filters.verificationTiers && filters.verificationTiers.length > 0) {
      if (!filters.verificationTiers.includes(clinic.verificationTier)) {
        return false;
      }
    }

    return true;
  });
}

// Helper to get clinic by slug
export function getClinicBySlug(slug: string): Clinic | undefined {
  return sampleClinics.find((c) => c.slug === slug);
}

// Australian states for filtering
export const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];
