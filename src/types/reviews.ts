// Review types for FindPAT Outcome Tracking

export type OutcomeRating = 
  | 'life_changing'
  | 'significant_improvement'
  | 'moderate_improvement'
  | 'slight_improvement'
  | 'no_change'
  | 'got_worse';

export type TreatmentType = 
  | 'mdma'
  | 'psilocybin'
  | 'ketamine'
  | 'lsd'
  | 'cannabis'
  | 'ayahuasca'
  | 'ibogaine'
  | '5-meo-dmt'
  | 'other';

export type ConditionTreated = 
  | 'ptsd'
  | 'depression'
  | 'anxiety'
  | 'addiction'
  | 'trauma'
  | 'end_of_life'
  | 'ocd'
  | 'eating_disorder'
  | 'chronic_pain'
  | 'relationship_issues'
  | 'spiritual_exploration'
  | 'other';

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface Review {
  id: string;
  practitioner_id: string;
  
  rating: number; // 1-5
  outcome_rating: OutcomeRating;
  treatment_type: TreatmentType;
  condition_treated: ConditionTreated;
  review_text: string | null;
  would_recommend: boolean;
  
  treatment_month: number | null;
  treatment_year: number | null;
  
  token_id: string | null;
  is_verified: boolean;
  status: ReviewStatus;
  
  moderated_at: string | null;
  moderated_by: string | null;
  moderation_notes: string | null;
  
  practitioner_response: string | null;
  response_at: string | null;
  
  created_at: string;
  updated_at: string;
}

export interface ReviewToken {
  id: string;
  practitioner_id: string;
  token: string;
  client_email: string | null;
  is_used: boolean;
  used_at: string | null;
  expires_at: string;
  created_at: string;
}

export interface PractitionerReviewStats {
  practitioner_id: string;
  total_reviews: number;
  approved_reviews: number;
  average_rating: number | null;
  outcome_counts: Record<OutcomeRating, number>;
  condition_counts: Record<ConditionTreated, number>;
  treatment_counts: Record<TreatmentType, number>;
  recommendation_rate: number | null;
  updated_at: string;
}

// Input type for submitting a review
export interface ReviewInput {
  rating: number;
  outcome_rating: OutcomeRating;
  treatment_type: TreatmentType;
  condition_treated: ConditionTreated;
  review_text?: string;
  would_recommend: boolean;
  treatment_month?: number;
  treatment_year?: number;
  token?: string; // Optional review token
}

// Labels for UI display
export const OUTCOME_RATING_LABELS: Record<OutcomeRating, string> = {
  life_changing: 'Life-changing',
  significant_improvement: 'Significant improvement',
  moderate_improvement: 'Moderate improvement',
  slight_improvement: 'Slight improvement',
  no_change: 'No change',
  got_worse: 'Got worse',
};

export const OUTCOME_RATING_EMOJI: Record<OutcomeRating, string> = {
  life_changing: '🌟',
  significant_improvement: '✨',
  moderate_improvement: '📈',
  slight_improvement: '➡️',
  no_change: '➖',
  got_worse: '⬇️',
};

export const OUTCOME_RATING_COLORS: Record<OutcomeRating, string> = {
  life_changing: 'bg-green-100 text-green-800 border-green-200',
  significant_improvement: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  moderate_improvement: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  slight_improvement: 'bg-blue-100 text-blue-800 border-blue-200',
  no_change: 'bg-gray-100 text-gray-600 border-gray-200',
  got_worse: 'bg-red-100 text-red-800 border-red-200',
};

// Positive outcomes for stats calculation
export const POSITIVE_OUTCOMES: OutcomeRating[] = [
  'life_changing',
  'significant_improvement',
  'moderate_improvement',
];

export const TREATMENT_TYPE_LABELS: Record<TreatmentType, string> = {
  mdma: 'MDMA',
  psilocybin: 'Psilocybin',
  ketamine: 'Ketamine',
  lsd: 'LSD',
  cannabis: 'Cannabis',
  ayahuasca: 'Ayahuasca',
  ibogaine: 'Ibogaine',
  '5-meo-dmt': '5-MeO-DMT',
  other: 'Other',
};

export const CONDITION_LABELS: Record<ConditionTreated, string> = {
  ptsd: 'PTSD',
  depression: 'Depression',
  anxiety: 'Anxiety',
  addiction: 'Addiction',
  trauma: 'Trauma',
  end_of_life: 'End-of-Life Anxiety',
  ocd: 'OCD',
  eating_disorder: 'Eating Disorder',
  chronic_pain: 'Chronic Pain',
  relationship_issues: 'Relationship Issues',
  spiritual_exploration: 'Spiritual Exploration',
  other: 'Other',
};

// Helper to calculate positive outcome percentage
export function calculatePositiveOutcomeRate(
  outcomeCounts: Record<OutcomeRating, number>
): number {
  const total = Object.values(outcomeCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  
  const positive = POSITIVE_OUTCOMES.reduce(
    (sum, outcome) => sum + (outcomeCounts[outcome] || 0),
    0
  );
  
  return Math.round((positive / total) * 100);
}

// Helper to format treatment date
export function formatTreatmentDate(month: number | null, year: number | null): string {
  if (!year) return 'Date not provided';
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  if (month && month >= 1 && month <= 12) {
    return `${monthNames[month - 1]} ${year}`;
  }
  
  return year.toString();
}
