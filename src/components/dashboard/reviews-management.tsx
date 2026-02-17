'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StarRatingDisplay } from '@/components/reviews';
import { OutcomeBadge } from '@/components/reviews/outcome-selector';
import { 
  Review, 
  ReviewToken,
  PractitionerReviewStats,
  TREATMENT_TYPE_LABELS,
  CONDITION_LABELS,
  formatTreatmentDate,
  calculatePositiveOutcomeRate,
  OutcomeRating,
  ConditionTreated,
  TreatmentType,
} from '@/types/reviews';
import { 
  MessageSquare, 
  Link2, 
  Copy, 
  CheckCircle, 
  Loader2,
  Send,
  Clock,
  TrendingUp,
  ThumbsUp,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewsManagementProps {
  practitionerId: string;
  practitionerSlug: string;
}

export function ReviewsManagement({ practitionerId, practitionerSlug }: ReviewsManagementProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'generate'>('overview');
  const [stats, setStats] = useState<PractitionerReviewStats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, reviewsRes] = await Promise.all([
          fetch(`/api/reviews/stats/${practitionerId}`),
          fetch(`/api/reviews?practitioner_id=${practitionerId}&status=approved`),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.stats);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
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
        </CardContent>
      </Card>
    );
  }

  const positiveRate = stats?.outcome_counts 
    ? calculatePositiveOutcomeRate(stats.outcome_counts)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="shadow-neumorphic">
        <CardHeader className="pb-4">
          <h3 className="font-semibold text-cyan-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-600" />
            Client Reviews & Outcomes
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-900">
                {stats?.approved_reviews || 0}
              </div>
              <div className="text-sm text-cyan-600">Reviews</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-900">
                {stats?.average_rating?.toFixed(1) || '-'}
              </div>
              <div className="text-sm text-cyan-600">Avg Rating</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-900">
                {positiveRate}%
              </div>
              <div className="text-sm text-cyan-600">Improved</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-900">
                {stats?.recommendation_rate ? `${Math.round(stats.recommendation_rate)}%` : '-'}
              </div>
              <div className="text-sm text-cyan-600">Recommend</div>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 border-b border-cyan-100 mb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'overview'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-cyan-500 hover:text-cyan-700'
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'reviews'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-cyan-500 hover:text-cyan-700'
              )}
            >
              All Reviews ({stats?.approved_reviews || 0})
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'generate'
                  ? 'border-cyan-600 text-cyan-700'
                  : 'border-transparent text-cyan-500 hover:text-cyan-700'
              )}
            >
              Request Reviews
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <ReviewsOverview stats={stats} />
          )}
          {activeTab === 'reviews' && (
            <ReviewsList reviews={reviews} practitionerId={practitionerId} />
          )}
          {activeTab === 'generate' && (
            <GenerateReviewLink practitionerSlug={practitionerSlug} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Overview tab content
function ReviewsOverview({ stats }: { stats: PractitionerReviewStats | null }) {
  if (!stats || stats.approved_reviews === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
        <h4 className="font-semibold text-cyan-900 mb-2">No Reviews Yet</h4>
        <p className="text-cyan-600 text-sm">
          Start collecting client reviews to build trust and showcase your outcomes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Outcome breakdown */}
      <div>
        <h4 className="font-medium text-cyan-900 mb-3">Outcome Breakdown</h4>
        <div className="space-y-2">
          {Object.entries(stats.outcome_counts)
            .filter(([, count]) => count > 0)
            .sort(([, a], [, b]) => b - a)
            .map(([outcome, count]) => {
              const total = Object.values(stats.outcome_counts).reduce((a, b) => a + b, 0);
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={outcome} className="flex items-center gap-3">
                  <OutcomeBadge outcome={outcome as OutcomeRating} />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-cyan-600 w-12 text-right">{percentage}%</span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Conditions treated */}
      <div>
        <h4 className="font-medium text-cyan-900 mb-3">Conditions Treated</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.condition_counts)
            .filter(([, count]) => count > 0)
            .map(([condition, count]) => (
              <span 
                key={condition}
                className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm"
              >
                {CONDITION_LABELS[condition as ConditionTreated]} ({count})
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

// Reviews list tab
function ReviewsList({ reviews, practitionerId }: { reviews: Review[]; practitionerId: string }) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitResponse = async (reviewId: string) => {
    if (!response.trim()) return;
    
    setIsSubmitting(true);
    try {
      // API call to submit response
      // For now, just simulate
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRespondingTo(null);
      setResponse('');
      // Would refresh reviews here
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
        <p className="text-cyan-600">No reviews to display yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div 
          key={review.id}
          className="p-4 border border-cyan-100 rounded-lg bg-white"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <StarRatingDisplay rating={review.rating} size="sm" />
              <div className="flex items-center gap-2 mt-2">
                <OutcomeBadge outcome={review.outcome_rating} />
                {review.is_verified && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm text-cyan-500">
              {formatTreatmentDate(review.treatment_month, review.treatment_year)}
            </span>
          </div>

          <div className="text-sm text-cyan-600 mb-2">
            {TREATMENT_TYPE_LABELS[review.treatment_type]} · {CONDITION_LABELS[review.condition_treated]}
          </div>

          {review.review_text && (
            <p className="text-cyan-700 mb-3">"{review.review_text}"</p>
          )}

          <div className="flex items-center gap-2 text-sm text-cyan-500">
            <ThumbsUp className={cn('h-4 w-4', review.would_recommend && 'fill-green-500 text-green-500')} />
            {review.would_recommend ? 'Would recommend' : 'Would not recommend'}
          </div>

          {/* Practitioner response section */}
          <div className="mt-4 pt-4 border-t border-cyan-100">
            {review.practitioner_response ? (
              <div className="bg-cyan-50 p-3 rounded-lg">
                <div className="text-xs text-cyan-600 mb-1">Your response:</div>
                <p className="text-sm text-cyan-700">{review.practitioner_response}</p>
              </div>
            ) : respondingTo === review.id ? (
              <div className="space-y-3">
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write a professional response..."
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitResponse(review.id)}
                    disabled={isSubmitting || !response.trim()}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Response'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setRespondingTo(null);
                      setResponse('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRespondingTo(review.id)}
                className="text-cyan-600"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Respond to this review
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Generate review link tab
function GenerateReviewLink({ practitionerSlug }: { practitionerSlug: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [clientEmail, setClientEmail] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/reviews/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_email: clientEmail || null }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLink(data.review_url);
      }
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const publicLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/review/${practitionerSlug}`;

  return (
    <div className="space-y-6">
      {/* Public link */}
      <div>
        <h4 className="font-medium text-cyan-900 mb-2">Public Review Link</h4>
        <p className="text-sm text-cyan-600 mb-3">
          Anyone can submit an anonymous review using this link:
        </p>
        <div className="flex gap-2">
          <Input 
            value={publicLink}
            readOnly
            className="font-mono text-sm"
          />
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(publicLink)}
            className="border-cyan-600 text-cyan-700"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Verified link generator */}
      <div className="pt-4 border-t border-cyan-100">
        <h4 className="font-medium text-cyan-900 mb-2">Generate Verified Review Link</h4>
        <p className="text-sm text-cyan-600 mb-3">
          Send personalized links to clients for verified reviews. Links expire after 30 days.
        </p>

        <div className="space-y-3">
          <div>
            <Label htmlFor="client-email" className="text-sm">
              Client Email (optional)
            </Label>
            <Input
              id="client-email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@example.com"
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Link2 className="h-4 w-4 mr-2" />
            )}
            Generate Verified Link
          </Button>
        </div>

        {generatedLink && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Link Generated!</span>
            </div>
            <div className="flex gap-2">
              <Input 
                value={generatedLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                onClick={handleCopy}
                className="border-green-600 text-green-700"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-green-600 mt-2">
              This link can only be used once and expires in 30 days.
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-amber-50 p-4 rounded-lg text-sm text-amber-700">
        <h5 className="font-medium mb-2">Tips for collecting reviews:</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>Send review requests 1-2 weeks after treatment</li>
          <li>Remind clients that reviews are anonymous</li>
          <li>Respond professionally to all reviews</li>
          <li>Thank clients for their feedback</li>
        </ul>
      </div>
    </div>
  );
}
