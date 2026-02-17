'use client';

import { Card, CardContent } from '@/components/ui/card';
import { StarRatingDisplay } from './star-rating';
import { 
  PractitionerReviewStats, 
  OutcomeRating,
  OUTCOME_RATING_LABELS,
  OUTCOME_RATING_EMOJI,
  OUTCOME_RATING_COLORS,
  POSITIVE_OUTCOMES,
  calculatePositiveOutcomeRate,
  CONDITION_LABELS,
  ConditionTreated,
} from '@/types/reviews';
import { TrendingUp, Users, ThumbsUp, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AggregateStatsProps {
  stats: PractitionerReviewStats;
  compact?: boolean;
}

export function AggregateStats({ stats, compact = false }: AggregateStatsProps) {
  const positiveRate = calculatePositiveOutcomeRate(stats.outcome_counts);
  
  if (compact) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {stats.average_rating && (
          <StarRatingDisplay 
            rating={stats.average_rating} 
            reviewCount={stats.approved_reviews}
            size="sm"
          />
        )}
        {positiveRate > 0 && (
          <span className="text-sm text-green-600 font-medium">
            {positiveRate}% report improvement
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Average rating */}
        <Card className="shadow-neumorphic">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            {stats.average_rating ? (
              <>
                <div className="text-2xl font-bold text-cyan-900">
                  {stats.average_rating.toFixed(1)}
                </div>
                <div className="text-sm text-cyan-600">Average Rating</div>
              </>
            ) : (
              <div className="text-sm text-cyan-500">No ratings yet</div>
            )}
          </CardContent>
        </Card>

        {/* Total reviews */}
        <Card className="shadow-neumorphic">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-2">
              <Users className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="text-2xl font-bold text-cyan-900">
              {stats.approved_reviews}
            </div>
            <div className="text-sm text-cyan-600">Client Reviews</div>
          </CardContent>
        </Card>

        {/* Positive outcomes */}
        <Card className="shadow-neumorphic">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-cyan-900">
              {positiveRate}%
            </div>
            <div className="text-sm text-cyan-600">Report Improvement</div>
          </CardContent>
        </Card>

        {/* Recommendation rate */}
        <Card className="shadow-neumorphic">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <ThumbsUp className="h-5 w-5 text-purple-600" />
            </div>
            {stats.recommendation_rate ? (
              <>
                <div className="text-2xl font-bold text-cyan-900">
                  {Math.round(stats.recommendation_rate)}%
                </div>
                <div className="text-sm text-cyan-600">Would Recommend</div>
              </>
            ) : (
              <div className="text-sm text-cyan-500">N/A</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Outcome breakdown */}
      {stats.approved_reviews > 0 && (
        <Card className="shadow-neumorphic">
          <CardContent className="p-5">
            <h4 className="font-semibold text-cyan-900 mb-4">Outcome Breakdown</h4>
            <OutcomeBreakdownChart outcomeCounts={stats.outcome_counts} />
          </CardContent>
        </Card>
      )}

      {/* Conditions treated */}
      {stats.approved_reviews > 0 && Object.keys(stats.condition_counts).length > 0 && (
        <Card className="shadow-neumorphic">
          <CardContent className="p-5">
            <h4 className="font-semibold text-cyan-900 mb-4">Conditions Treated</h4>
            <ConditionBreakdown conditionCounts={stats.condition_counts} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Horizontal bar chart for outcome breakdown
function OutcomeBreakdownChart({ 
  outcomeCounts 
}: { 
  outcomeCounts: Record<OutcomeRating, number> 
}) {
  const total = Object.values(outcomeCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const outcomes: OutcomeRating[] = [
    'life_changing',
    'significant_improvement',
    'moderate_improvement',
    'slight_improvement',
    'no_change',
    'got_worse',
  ];

  return (
    <div className="space-y-3">
      {outcomes.map((outcome) => {
        const count = outcomeCounts[outcome] || 0;
        const percentage = Math.round((count / total) * 100);
        
        if (count === 0) return null;
        
        return (
          <div key={outcome} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span>{OUTCOME_RATING_EMOJI[outcome]}</span>
                <span className="text-cyan-700">{OUTCOME_RATING_LABELS[outcome]}</span>
              </span>
              <span className="text-cyan-600 font-medium">{percentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  POSITIVE_OUTCOMES.includes(outcome)
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : outcome === 'no_change'
                      ? 'bg-gray-400'
                      : 'bg-red-400'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Tag cloud for conditions
function ConditionBreakdown({
  conditionCounts
}: {
  conditionCounts: Record<ConditionTreated, number>
}) {
  const sorted = Object.entries(conditionCounts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map(([condition, count]) => (
        <span 
          key={condition}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm"
        >
          {CONDITION_LABELS[condition as ConditionTreated]}
          <span className="text-cyan-500 text-xs">({count})</span>
        </span>
      ))}
    </div>
  );
}

// Mini stats for practitioner cards
export function MiniReviewStats({ 
  rating, 
  reviewCount,
  positiveRate 
}: { 
  rating: number | null; 
  reviewCount: number;
  positiveRate: number;
}) {
  if (reviewCount === 0) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      {rating && (
        <StarRatingDisplay rating={rating} reviewCount={reviewCount} size="sm" />
      )}
      {positiveRate > 0 && (
        <span className="text-green-600">
          {positiveRate}% improved
        </span>
      )}
    </div>
  );
}
