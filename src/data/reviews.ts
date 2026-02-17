// Sample review data for FindPAT
import { Review, PractitionerReviewStats, OutcomeRating, ConditionTreated, TreatmentType } from '@/types/reviews';

// Sample reviews for demonstration
export const sampleReviews: Review[] = [
  {
    id: 'review-1',
    practitioner_id: 'sarah-chen',
    rating: 5,
    outcome_rating: 'life_changing',
    treatment_type: 'psilocybin',
    condition_treated: 'depression',
    review_text: 'After struggling with treatment-resistant depression for over a decade, I finally found relief. Dr. Chen\'s approach was incredibly compassionate and professional. The integration sessions were invaluable.',
    would_recommend: true,
    treatment_month: 8,
    treatment_year: 2024,
    token_id: null,
    is_verified: true,
    status: 'approved',
    moderated_at: '2024-09-15T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: 'Thank you for sharing your journey. It was a privilege to support you through this process.',
    response_at: '2024-09-16T14:00:00Z',
    created_at: '2024-09-10T08:30:00Z',
    updated_at: '2024-09-16T14:00:00Z',
  },
  {
    id: 'review-2',
    practitioner_id: 'sarah-chen',
    rating: 5,
    outcome_rating: 'significant_improvement',
    treatment_type: 'psilocybin',
    condition_treated: 'ptsd',
    review_text: 'The preparation and support before, during, and after my session was outstanding. I felt safe the entire time. My PTSD symptoms have significantly decreased.',
    would_recommend: true,
    treatment_month: 6,
    treatment_year: 2024,
    token_id: null,
    is_verified: true,
    status: 'approved',
    moderated_at: '2024-07-05T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2024-07-01T12:00:00Z',
    updated_at: '2024-07-05T10:00:00Z',
  },
  {
    id: 'review-3',
    practitioner_id: 'sarah-chen',
    rating: 4,
    outcome_rating: 'moderate_improvement',
    treatment_type: 'ketamine',
    condition_treated: 'anxiety',
    review_text: 'Good experience overall. The session itself was challenging but the integration support helped me process everything. I\'m feeling better but still working through some things.',
    would_recommend: true,
    treatment_month: 3,
    treatment_year: 2024,
    token_id: null,
    is_verified: false,
    status: 'approved',
    moderated_at: '2024-04-10T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2024-04-05T16:30:00Z',
    updated_at: '2024-04-10T10:00:00Z',
  },
  {
    id: 'review-4',
    practitioner_id: 'sarah-chen',
    rating: 5,
    outcome_rating: 'life_changing',
    treatment_type: 'psilocybin',
    condition_treated: 'end_of_life',
    review_text: 'Facing a terminal diagnosis, I sought help with existential anxiety. This experience gave me a profound sense of peace and acceptance that I never thought possible.',
    would_recommend: true,
    treatment_month: 1,
    treatment_year: 2024,
    token_id: null,
    is_verified: true,
    status: 'approved',
    moderated_at: '2024-02-01T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2024-01-28T09:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'review-5',
    practitioner_id: 'sarah-chen',
    rating: 4,
    outcome_rating: 'significant_improvement',
    treatment_type: 'psilocybin',
    condition_treated: 'trauma',
    review_text: 'Very professional and caring. The environment was calm and supportive. I would recommend more sessions for the full benefit.',
    would_recommend: true,
    treatment_month: 11,
    treatment_year: 2023,
    token_id: null,
    is_verified: false,
    status: 'approved',
    moderated_at: '2023-12-10T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2023-12-05T11:00:00Z',
    updated_at: '2023-12-10T10:00:00Z',
  },
  // Reviews for another practitioner
  {
    id: 'review-6',
    practitioner_id: 'james-miller',
    rating: 5,
    outcome_rating: 'significant_improvement',
    treatment_type: 'ketamine',
    condition_treated: 'depression',
    review_text: 'Dr. Miller\'s ketamine program helped me when nothing else worked. The follow-up care was excellent.',
    would_recommend: true,
    treatment_month: 7,
    treatment_year: 2024,
    token_id: null,
    is_verified: true,
    status: 'approved',
    moderated_at: '2024-08-01T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2024-07-28T14:00:00Z',
    updated_at: '2024-08-01T10:00:00Z',
  },
  {
    id: 'review-7',
    practitioner_id: 'james-miller',
    rating: 4,
    outcome_rating: 'moderate_improvement',
    treatment_type: 'ketamine',
    condition_treated: 'chronic_pain',
    review_text: 'Good results for my chronic pain condition. Professional service throughout.',
    would_recommend: true,
    treatment_month: 5,
    treatment_year: 2024,
    token_id: null,
    is_verified: false,
    status: 'approved',
    moderated_at: '2024-06-01T10:00:00Z',
    moderated_by: null,
    moderation_notes: null,
    practitioner_response: null,
    response_at: null,
    created_at: '2024-05-25T10:00:00Z',
    updated_at: '2024-06-01T10:00:00Z',
  },
];

// Helper to get reviews for a practitioner
export function getReviewsForPractitioner(practitionerSlug: string): Review[] {
  const slugToId: Record<string, string> = {
    'sarah-chen': 'sarah-chen',
    'james-miller': 'james-miller',
  };
  
  const practitionerId = slugToId[practitionerSlug];
  if (!practitionerId) return [];
  
  return sampleReviews.filter(r => r.practitioner_id === practitionerId && r.status === 'approved');
}

// Helper to calculate stats for a practitioner
export function getStatsForPractitioner(practitionerSlug: string): PractitionerReviewStats {
  const reviews = getReviewsForPractitioner(practitionerSlug);
  
  if (reviews.length === 0) {
    return {
      practitioner_id: practitionerSlug,
      total_reviews: 0,
      approved_reviews: 0,
      average_rating: null,
      outcome_counts: {} as Record<OutcomeRating, number>,
      condition_counts: {} as Record<ConditionTreated, number>,
      treatment_counts: {} as Record<TreatmentType, number>,
      recommendation_rate: null,
      updated_at: new Date().toISOString(),
    };
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const recommendCount = reviews.filter(r => r.would_recommend).length;
  
  const outcomeCounts = {} as Record<OutcomeRating, number>;
  const conditionCounts = {} as Record<ConditionTreated, number>;
  const treatmentCounts = {} as Record<TreatmentType, number>;

  reviews.forEach(review => {
    outcomeCounts[review.outcome_rating] = (outcomeCounts[review.outcome_rating] || 0) + 1;
    conditionCounts[review.condition_treated] = (conditionCounts[review.condition_treated] || 0) + 1;
    treatmentCounts[review.treatment_type] = (treatmentCounts[review.treatment_type] || 0) + 1;
  });

  return {
    practitioner_id: practitionerSlug,
    total_reviews: reviews.length,
    approved_reviews: reviews.length,
    average_rating: Math.round(avgRating * 10) / 10,
    outcome_counts: outcomeCounts,
    condition_counts: conditionCounts,
    treatment_counts: treatmentCounts,
    recommendation_rate: Math.round((recommendCount / reviews.length) * 100),
    updated_at: new Date().toISOString(),
  };
}
