'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AggregateStats } from './aggregate-stats';
import { ReviewCard } from './review-card';
import { 
  Review, 
  PractitionerReviewStats,
  OutcomeRating,
  ConditionTreated,
  TreatmentType,
} from '@/types/reviews';
import { MessageSquare, Loader2, ChevronDown } from 'lucide-react';

interface ReviewsSectionProps {
  practitionerId: string;
  practitionerSlug: string;
}

// Default empty stats
const defaultStats: PractitionerReviewStats = {
  practitioner_id: '',
  total_reviews: 0,
  approved_reviews: 0,
  average_rating: null,
  outcome_counts: {} as Record<OutcomeRating, number>,
  condition_counts: {} as Record<ConditionTreated, number>,
  treatment_counts: {} as Record<TreatmentType, number>,
  recommendation_rate: null,
  updated_at: new Date().toISOString(),
};

export function ReviewsSection({ practitionerId, practitionerSlug }: ReviewsSectionProps) {
  const [stats, setStats] = useState<PractitionerReviewStats>(defaultStats);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch(`/api/reviews/stats/${practitionerId}`);
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.stats);
        }

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/reviews?practitioner_id=${practitionerId}&status=approved`);
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [practitionerId]);

  if (isLoading) {
    return (
      <Card className="shadow-neumorphic">
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-600 mx-auto" />
          <p className="text-cyan-600 mt-2">Loading reviews...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-neumorphic">
        <CardContent className="p-6 text-center text-red-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  // No reviews yet
  if (stats.approved_reviews === 0) {
    return (
      <Card className="shadow-neumorphic">
        <CardContent className="p-6 text-center">
          <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-cyan-900 mb-2">No Reviews Yet</h3>
          <p className="text-cyan-600 text-sm mb-4">
            Be the first to share your experience with this practitioner.
          </p>
          <a href={`/review/${practitionerSlug}`}>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              Write a Review
            </Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <Card className="shadow-neumorphic">
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold text-cyan-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-600" />
            Client Outcomes
          </h2>
        </CardHeader>
        <CardContent className="pt-0">
          <AggregateStats stats={stats} />
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card className="shadow-neumorphic">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-cyan-900">
              Client Reviews ({stats.approved_reviews})
            </h3>
            <a href={`/review/${practitionerSlug}`}>
              <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-700">
                Write a Review
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {/* Show more button */}
          {reviews.length > 3 && !showAllReviews && (
            <Button
              variant="ghost"
              className="w-full text-cyan-600 hover:text-cyan-800"
              onClick={() => setShowAllReviews(true)}
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Show All {reviews.length} Reviews
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Server-rendered version with sample data for initial display
export function ReviewsSectionStatic({ 
  practitionerId,
  practitionerSlug,
  stats,
  reviews 
}: {
  practitionerId: string;
  practitionerSlug: string;
  stats: PractitionerReviewStats;
  reviews: Review[];
}) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  if (stats.approved_reviews === 0) {
    return (
      <Card className="shadow-neumorphic">
        <CardContent className="p-6 text-center">
          <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-cyan-900 mb-2">No Reviews Yet</h3>
          <p className="text-cyan-600 text-sm mb-4">
            Be the first to share your experience with this practitioner.
          </p>
          <a href={`/review/${practitionerSlug}`}>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              Write a Review
            </Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-neumorphic">
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold text-cyan-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-600" />
            Client Outcomes
          </h2>
        </CardHeader>
        <CardContent className="pt-0">
          <AggregateStats stats={stats} />
        </CardContent>
      </Card>

      <Card className="shadow-neumorphic">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-cyan-900">
              Client Reviews ({stats.approved_reviews})
            </h3>
            <a href={`/review/${practitionerSlug}`}>
              <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-700">
                Write a Review
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {reviews.length > 3 && !showAllReviews && (
            <Button
              variant="ghost"
              className="w-full text-cyan-600 hover:text-cyan-800"
              onClick={() => setShowAllReviews(true)}
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Show All {reviews.length} Reviews
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
