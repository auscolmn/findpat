import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{ practitionerId: string }>;
}

// GET - Get review stats for a practitioner
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { practitionerId } = await params;
    const supabase = await createClient();

    // Get cached stats
    const { data: stats, error: statsError } = await supabase
      .from('practitioner_review_stats')
      .select('*')
      .eq('practitioner_id', practitionerId)
      .single();

    // If no cached stats, calculate on the fly
    if (statsError || !stats) {
      // Get reviews and calculate stats
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('practitioner_id', practitionerId)
        .eq('status', 'approved');

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        return NextResponse.json(
          { error: 'Failed to fetch review stats' },
          { status: 500 }
        );
      }

      if (!reviews || reviews.length === 0) {
        return NextResponse.json({
          stats: {
            practitioner_id: practitionerId,
            total_reviews: 0,
            approved_reviews: 0,
            average_rating: null,
            outcome_counts: {},
            condition_counts: {},
            treatment_counts: {},
            recommendation_rate: null,
          }
        });
      }

      // Calculate stats
      const totalReviews = reviews.length;
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
      const recommendCount = reviews.filter(r => r.would_recommend).length;
      
      const outcomeCounts: Record<string, number> = {};
      const conditionCounts: Record<string, number> = {};
      const treatmentCounts: Record<string, number> = {};

      reviews.forEach(review => {
        outcomeCounts[review.outcome_rating] = (outcomeCounts[review.outcome_rating] || 0) + 1;
        conditionCounts[review.condition_treated] = (conditionCounts[review.condition_treated] || 0) + 1;
        treatmentCounts[review.treatment_type] = (treatmentCounts[review.treatment_type] || 0) + 1;
      });

      return NextResponse.json({
        stats: {
          practitioner_id: practitionerId,
          total_reviews: totalReviews,
          approved_reviews: totalReviews,
          average_rating: Math.round(avgRating * 100) / 100,
          outcome_counts: outcomeCounts,
          condition_counts: conditionCounts,
          treatment_counts: treatmentCounts,
          recommendation_rate: Math.round((recommendCount / totalReviews) * 100),
        }
      });
    }

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
