import { Practitioner } from '@/types';

export const samplePractitioners: Practitioner[] = [
  {
    id: '1',
    slug: 'dr-sarah-martinez',
    name: 'Dr. Sarah Martinez, MD',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    bio: 'Board-certified psychiatrist with over 15 years of clinical experience. Completed MAPS MDMA-Assisted Psychotherapy training and has been practicing psychedelic-assisted therapy since 2019. My approach integrates somatic experiencing, internal family systems (IFS), and trauma-informed care.\n\nI believe in the profound healing potential of psychedelic-assisted therapy when practiced with safety, integrity, and deep respect for the medicine and the individual.',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
    role: 'psychiatrist',
    licenseType: 'MD',
    yearsExperience: 15,
    verificationTier: 'certified',
    availability: 'accepting',
    modalities: ['mdma', 'psilocybin', 'ketamine'],
    specialties: ['trauma', 'ptsd', 'depression'],
    lookingToCollaborate: true,
    collaborationRoles: ['psychologist', 'therapist'],
    website: 'https://drsarahmartinez.com',
    bookingUrl: 'https://calendly.com/drsarahmartinez',
    languages: ['English', 'Spanish'],
    credentials: [
      {
        id: 'c1',
        name: 'MAPS MDMA-Assisted Psychotherapy Training',
        issuer: 'MAPS',
        issuedAt: '2021-03-15',
        status: 'active',
        certificateId: 'MAPS-2021-00234',
      },
      {
        id: 'c2',
        name: 'California Medical License',
        issuer: 'Medical Board of California',
        issuedAt: '2009-06-01',
        status: 'active',
        certificateId: 'G12345',
      },
    ],
  },
  {
    id: '2',
    slug: 'michael-chen',
    name: 'Michael Chen, LCSW',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Licensed clinical social worker specializing in ketamine-assisted psychotherapy and integration. I work with individuals navigating depression, anxiety, and life transitions. My practice is rooted in mindfulness, compassion-focused therapy, and harm reduction principles.',
    location: {
      city: 'Oakland',
      state: 'CA',
      country: 'US',
    },
    role: 'therapist',
    licenseType: 'LCSW',
    yearsExperience: 8,
    verificationTier: 'verified',
    availability: 'waitlist',
    modalities: ['ketamine'],
    specialties: ['depression', 'anxiety', 'spiritual'],
    lookingToCollaborate: true,
    collaborationRoles: ['psychiatrist'],
    website: 'https://michaelchentherapy.com',
    languages: ['English', 'Mandarin'],
    credentials: [
      {
        id: 'c3',
        name: 'Ketamine-Assisted Psychotherapy Certificate',
        issuer: 'Fluence',
        issuedAt: '2022-08-20',
        status: 'active',
        certificateId: 'FLU-2022-00891',
      },
      {
        id: 'c4',
        name: 'California LCSW License',
        issuer: 'Board of Behavioral Sciences',
        issuedAt: '2016-01-15',
        status: 'active',
      },
    ],
  },
  {
    id: '3',
    slug: 'dr-elena-rodriguez',
    name: 'Dr. Elena Rodriguez, PhD',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    bio: 'Clinical psychologist with expertise in psilocybin-assisted therapy for end-of-life anxiety and existential distress. Previously conducted research at Johns Hopkins Center for Psychedelic and Consciousness Research. I bring a blend of scientific rigor and compassionate presence to my practice.',
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'US',
    },
    role: 'psychologist',
    licenseType: 'PhD',
    yearsExperience: 12,
    verificationTier: 'certified',
    availability: 'accepting',
    modalities: ['psilocybin'],
    specialties: ['end_of_life', 'anxiety', 'depression'],
    lookingToCollaborate: false,
    website: 'https://drelena.co',
    bookingUrl: 'https://drelena.co/book',
    languages: ['English'],
    credentials: [
      {
        id: 'c5',
        name: 'Johns Hopkins Psilocybin Research Therapist Training',
        issuer: 'Johns Hopkins University',
        issuedAt: '2019-11-01',
        status: 'active',
        certificateId: 'JHU-PSI-2019-0045',
      },
      {
        id: 'c6',
        name: 'Colorado Psychology License',
        issuer: 'Colorado State Board of Psychologist Examiners',
        issuedAt: '2012-05-20',
        status: 'active',
      },
    ],
  },
  {
    id: '4',
    slug: 'james-wilson',
    name: 'James Wilson, LPC',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Licensed professional counselor focused on MDMA-assisted therapy for PTSD and trauma. Veteran and first responder specialist. My own healing journey with psychedelics inspired me to help others find their path to wholeness.',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'US',
    },
    role: 'therapist',
    licenseType: 'LPC',
    yearsExperience: 6,
    verificationTier: 'verified',
    availability: 'accepting',
    modalities: ['mdma'],
    specialties: ['trauma', 'ptsd'],
    lookingToCollaborate: true,
    collaborationRoles: ['psychiatrist', 'nurse'],
    website: 'https://jameswilsontherapy.com',
    languages: ['English'],
    credentials: [
      {
        id: 'c7',
        name: 'MAPS MDMA Therapy Training Program',
        issuer: 'MAPS',
        issuedAt: '2023-02-10',
        status: 'active',
        certificateId: 'MAPS-2023-00567',
      },
    ],
  },
  {
    id: '5',
    slug: 'dr-maya-patel',
    name: 'Dr. Maya Patel, DO',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    bio: 'Osteopathic psychiatrist specializing in ketamine infusion therapy and psychedelic medicine. I combine conventional psychiatry with integrative approaches, including somatic therapies and mindfulness practices. Available for both prescribing and therapy sessions.',
    location: {
      city: 'Portland',
      state: 'OR',
      country: 'US',
    },
    role: 'psychiatrist',
    licenseType: 'DO',
    yearsExperience: 10,
    verificationTier: 'certified',
    availability: 'accepting',
    modalities: ['ketamine', 'psilocybin'],
    specialties: ['depression', 'anxiety', 'chronic_pain'],
    lookingToCollaborate: true,
    collaborationRoles: ['psychologist', 'therapist', 'integration_coach'],
    website: 'https://drpatelpsych.com',
    bookingUrl: 'https://drpatelpsych.com/schedule',
    languages: ['English', 'Hindi'],
    credentials: [
      {
        id: 'c8',
        name: 'Oregon Medical License',
        issuer: 'Oregon Medical Board',
        issuedAt: '2014-07-01',
        status: 'active',
      },
      {
        id: 'c9',
        name: 'Ketamine-Assisted Psychotherapy Certification',
        issuer: 'Polaris Insight Center',
        issuedAt: '2020-04-15',
        status: 'active',
        certificateId: 'POL-KAP-2020-0123',
      },
    ],
  },
  {
    id: '6',
    slug: 'lisa-nguyen',
    name: 'Lisa Nguyen, MA, LPC',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Integration coach and licensed counselor helping individuals prepare for and integrate psychedelic experiences. I specialize in working with people who have had difficult or challenging experiences. My approach is trauma-informed, somatic, and spiritually inclusive.',
    location: {
      city: 'Boulder',
      state: 'CO',
      country: 'US',
    },
    role: 'integration_coach',
    licenseType: 'LPC',
    yearsExperience: 5,
    verificationTier: 'listed',
    availability: 'accepting',
    modalities: ['psilocybin', 'ayahuasca', 'mdma'],
    specialties: ['spiritual', 'trauma', 'anxiety'],
    lookingToCollaborate: true,
    collaborationRoles: ['psychiatrist', 'psychologist'],
    website: 'https://lisanintegration.com',
    languages: ['English', 'Vietnamese'],
    credentials: [
      {
        id: 'c10',
        name: 'Psychedelic Integration Coach Certificate',
        issuer: 'Being True To You',
        issuedAt: '2022-09-01',
        status: 'active',
      },
    ],
  },
  {
    id: '7',
    slug: 'dr-robert-kim',
    name: 'Dr. Robert Kim, MD, MPH',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    bio: 'Addiction psychiatrist with special interest in ibogaine and ayahuasca for substance use disorders. My public health background informs my harm reduction approach. I work closely with residential treatment centers and provide medical oversight for plant medicine retreats.',
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'US',
    },
    role: 'psychiatrist',
    licenseType: 'MD',
    yearsExperience: 18,
    verificationTier: 'verified',
    availability: 'waitlist',
    modalities: ['ibogaine', 'ayahuasca', 'ketamine'],
    specialties: ['addiction'],
    lookingToCollaborate: false,
    website: 'https://drkimaddiction.com',
    languages: ['English', 'Korean'],
    credentials: [
      {
        id: 'c11',
        name: 'Washington State Medical License',
        issuer: 'Washington Medical Commission',
        issuedAt: '2006-03-15',
        status: 'active',
      },
      {
        id: 'c12',
        name: 'Board Certification - Addiction Psychiatry',
        issuer: 'ABPN',
        issuedAt: '2010-08-01',
        status: 'active',
      },
    ],
  },
  {
    id: '8',
    slug: 'amanda-brooks',
    name: 'Amanda Brooks, NP',
    photoUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face',
    bio: 'Psychiatric nurse practitioner offering ketamine therapy for treatment-resistant depression and anxiety. I provide a warm, supportive environment for healing. Certified in trauma-informed care and trained in EMDR as an adjunct to ketamine work.',
    location: {
      city: 'Phoenix',
      state: 'AZ',
      country: 'US',
    },
    role: 'nurse',
    licenseType: 'PMHNP-BC',
    yearsExperience: 7,
    verificationTier: 'verified',
    availability: 'accepting',
    modalities: ['ketamine'],
    specialties: ['depression', 'anxiety', 'trauma'],
    lookingToCollaborate: true,
    collaborationRoles: ['therapist', 'integration_coach'],
    website: 'https://amandabrooksnp.com',
    bookingUrl: 'https://amandabrooksnp.com/book',
    languages: ['English'],
    credentials: [
      {
        id: 'c13',
        name: 'Arizona RN License',
        issuer: 'Arizona State Board of Nursing',
        issuedAt: '2017-01-15',
        status: 'active',
      },
      {
        id: 'c14',
        name: 'PMHNP Board Certification',
        issuer: 'ANCC',
        issuedAt: '2018-06-20',
        status: 'active',
      },
    ],
  },
];

export function searchPractitioners(
  practitioners: Practitioner[],
  filters: {
    userType?: 'client' | 'practitioner';
    location?: string;
    modalities?: string[];
    specialties?: string[];
    roles?: string[];
    verificationTiers?: string[];
    lookingToCollaborate?: boolean;
  }
): Practitioner[] {
  return practitioners.filter((p) => {
    // Location filter
    if (filters.location) {
      const locationStr = `${p.location.city} ${p.location.state}`.toLowerCase();
      if (!locationStr.includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // Modalities filter
    if (filters.modalities && filters.modalities.length > 0) {
      if (!filters.modalities.some((m) => p.modalities.includes(m as any))) {
        return false;
      }
    }

    // Specialties filter
    if (filters.specialties && filters.specialties.length > 0) {
      if (!filters.specialties.some((s) => p.specialties.includes(s as any))) {
        return false;
      }
    }

    // Roles filter
    if (filters.roles && filters.roles.length > 0) {
      if (!filters.roles.includes(p.role)) {
        return false;
      }
    }

    // Verification tier filter
    if (filters.verificationTiers && filters.verificationTiers.length > 0) {
      if (!filters.verificationTiers.includes(p.verificationTier)) {
        return false;
      }
    }

    // Collaboration filter (for practitioners seeking collaborators)
    if (filters.userType === 'practitioner' && filters.lookingToCollaborate) {
      if (!p.lookingToCollaborate) {
        return false;
      }
    }

    return true;
  });
}
