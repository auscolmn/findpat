'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './star-rating';
import { OutcomeBadge } from './outcome-selector';
import { 
  Review, 
  TREATMENT_TYPE_LABELS, 
  CONDITION_LABELS,
  formatTreatmentDate 
} from '@/types/reviews';
import { CheckCircle, ThumbsUp, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  showPractitionerResponse?: boolean;
}

export function ReviewCard({ review, showPractitionerResponse = true }: ReviewCardProps) {
  return (
    <Card className="shadow-neumorphic overflow-hidden">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <StarRating value={review.rating} readonly size="sm" />
              {review.is_verified && (
                <Badge 
                  variant="outline" 
                  className="text-green-700 border-green-300 bg-green-50"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Client
                </Badge>
              )}
            </div>
            <OutcomeBadge outcome={review.outcome_rating} />
          </div>
          
          <span className="text-sm text-cyan-500 whitespace-nowrap">
            {formatTreatmentDate(review.treatment_month, review.treatment_year)}
          </span>
        </div>

        {/* Treatment details */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">
            {TREATMENT_TYPE_LABELS[review.treatment_type]}
          </Badge>
          <Badge variant="outline" className="border-cyan-200 text-cyan-700">
            {CONDITION_LABELS[review.condition_treated]}
          </Badge>
        </div>

        {/* Review text */}
        {review.review_text && (
          <div className="mb-4">
            <p className="text-cyan-700 leading-relaxed">
              "{review.review_text}"
            </p>
          </div>
        )}

        {/* Recommendation */}
        <div className={cn(
          'flex items-center gap-2 text-sm py-2 px-3 rounded-lg',
          review.would_recommend 
            ? 'bg-green-50 text-green-700' 
            : 'bg-gray-50 text-gray-600'
        )}>
          <ThumbsUp className={cn(
            'h-4 w-4',
            review.would_recommend ? 'fill-green-500' : ''
          )} />
          <span>
            {review.would_recommend 
              ? 'Would recommend this practitioner' 
              : 'Would not recommend'}
          </span>
        </div>

        {/* Practitioner response */}
        {showPractitionerResponse && review.practitioner_response && (
          <div className="mt-4 pt-4 border-t border-cyan-100">
            <div className="flex items-center gap-2 text-sm text-cyan-600 mb-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Practitioner response</span>
            </div>
            <p className="text-cyan-700 text-sm bg-cyan-50 p-3 rounded-lg">
              {review.practitioner_response}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for search results
export function ReviewCardCompact({ review }: { review: Review }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-50/50">
      <StarRating value={review.rating} readonly size="sm" />
      <div className="flex-1 min-w-0">
        <OutcomeBadge outcome={review.outcome_rating} />
        {review.review_text && (
          <p className="text-sm text-cyan-700 mt-1 line-clamp-2">
            "{review.review_text}"
          </p>
        )}
      </div>
    </div>
  );
}
