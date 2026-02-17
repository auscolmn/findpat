'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StarRating } from './star-rating';
import { OutcomeSelector } from './outcome-selector';
import {
  ReviewInput,
  OutcomeRating,
  TreatmentType,
  ConditionTreated,
  TREATMENT_TYPE_LABELS,
  CONDITION_LABELS,
  OUTCOME_RATING_LABELS,
} from '@/types/reviews';
import { 
  Loader2, 
  Shield, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  practitionerId: string;
  practitionerName: string;
  token?: string;
  onSuccess?: () => void;
}

type FormStep = 'rating' | 'details' | 'review' | 'confirm';

export function ReviewForm({ 
  practitionerId, 
  practitionerName,
  token,
  onSuccess 
}: ReviewFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<FormStep>('rating');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [outcomeRating, setOutcomeRating] = useState<OutcomeRating | null>(null);
  const [treatmentType, setTreatmentType] = useState<TreatmentType | null>(null);
  const [condition, setCondition] = useState<ConditionTreated | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [treatmentMonth, setTreatmentMonth] = useState<number | undefined>();
  const [treatmentYear, setTreatmentYear] = useState<number | undefined>();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const canProceedFromRating = rating > 0 && outcomeRating !== null;
  const canProceedFromDetails = treatmentType !== null && condition !== null;
  const canSubmit = wouldRecommend !== null;

  const handleSubmit = async () => {
    if (!canSubmit || !outcomeRating || !treatmentType || !condition) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practitioner_id: practitionerId,
          rating,
          outcome_rating: outcomeRating,
          treatment_type: treatmentType,
          condition_treated: condition,
          review_text: reviewText || null,
          would_recommend: wouldRecommend,
          treatment_month: treatmentMonth,
          treatment_year: treatmentYear,
          token,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="shadow-neumorphic max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-cyan-900 mb-2">
            Thank You for Your Review!
          </h2>
          <p className="text-cyan-600 mb-6">
            Your feedback helps other people find quality psychedelic-assisted therapy 
            and builds the evidence base for PAT in Australia.
          </p>
          <p className="text-sm text-cyan-500 mb-6">
            Your review will be visible after moderation (usually within 24-48 hours).
          </p>
          <Button 
            onClick={() => router.push('/')}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            Back to FindPAT
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-neumorphic max-w-2xl mx-auto">
      <CardContent className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-900 mb-2">
            Share Your Experience
          </h2>
          <p className="text-cyan-600">
            with <span className="font-semibold">{practitionerName}</span>
          </p>
          {token && (
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>Verified review link</span>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['rating', 'details', 'review', 'confirm'] as FormStep[]).map((s, idx) => (
            <div
              key={s}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                idx === 0 ? 'w-8' : 'w-8',
                step === s ? 'bg-cyan-500' :
                (['rating', 'details', 'review', 'confirm'].indexOf(step) > idx) 
                  ? 'bg-cyan-300' 
                  : 'bg-gray-200'
              )}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-50 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step: Rating */}
        {step === 'rating' && (
          <div className="space-y-8">
            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-4 block">
                Overall, how would you rate your experience?
              </Label>
              <div className="flex justify-center py-4">
                <StarRating 
                  value={rating} 
                  onChange={setRating} 
                  size="lg"
                  showLabel
                />
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-4 block">
                How much did this treatment help you?
              </Label>
              <OutcomeSelector 
                value={outcomeRating} 
                onChange={setOutcomeRating} 
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setStep('details')}
                disabled={!canProceedFromRating}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step: Treatment Details */}
        {step === 'details' && (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-3 block">
                What treatment did you receive?
              </Label>
              <Select 
                value={treatmentType || ''} 
                onValueChange={(v) => setTreatmentType(v as TreatmentType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select treatment type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TREATMENT_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-3 block">
                What condition were you seeking help for?
              </Label>
              <Select 
                value={condition || ''} 
                onValueChange={(v) => setCondition(v as ConditionTreated)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-3 block">
                When did you receive treatment? (optional)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Select 
                  value={treatmentMonth?.toString() || ''} 
                  onValueChange={(v) => setTreatmentMonth(v ? parseInt(v) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(({ value, label }) => (
                      <SelectItem key={value} value={value.toString()}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={treatmentYear?.toString() || ''} 
                  onValueChange={(v) => setTreatmentYear(v ? parseInt(v) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('rating')}
                className="border-cyan-600 text-cyan-700"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep('review')}
                disabled={!canProceedFromDetails}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step: Written Review */}
        {step === 'review' && (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-3 block">
                Share your experience (optional)
              </Label>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What was helpful? What could be improved? Your story may help others..."
                rows={5}
                className="resize-none"
              />
              <p className="text-sm text-cyan-500 mt-2">
                Please don't include identifying information. Reviews are anonymous.
              </p>
            </div>

            <div>
              <Label className="text-lg font-medium text-cyan-900 mb-3 block">
                Would you recommend this practitioner?
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={cn(
                    'flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all',
                    wouldRecommend === true
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  )}
                >
                  <ThumbsUp className={cn(
                    'h-6 w-6',
                    wouldRecommend === true && 'fill-green-500'
                  )} />
                  <span className="font-medium">Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={cn(
                    'flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all',
                    wouldRecommend === false
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300'
                  )}
                >
                  <ThumbsDown className={cn(
                    'h-6 w-6',
                    wouldRecommend === false && 'fill-red-500'
                  )} />
                  <span className="font-medium">No</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('details')}
                className="border-cyan-600 text-cyan-700"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep('confirm')}
                disabled={!canSubmit}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Review & Submit
              </Button>
            </div>
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && outcomeRating && treatmentType && condition && (
          <div className="space-y-6">
            <div className="bg-cyan-50 rounded-lg p-5 space-y-4">
              <h3 className="font-semibold text-cyan-900">Review Summary</h3>
              
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyan-600">Rating:</span>
                  <StarRating value={rating} readonly size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">Outcome:</span>
                  <span className="font-medium text-cyan-900">
                    {OUTCOME_RATING_LABELS[outcomeRating]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">Treatment:</span>
                  <span className="font-medium text-cyan-900">
                    {TREATMENT_TYPE_LABELS[treatmentType]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">Condition:</span>
                  <span className="font-medium text-cyan-900">
                    {CONDITION_LABELS[condition]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">Recommend:</span>
                  <span className={cn(
                    'font-medium',
                    wouldRecommend ? 'text-green-600' : 'text-red-600'
                  )}>
                    {wouldRecommend ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {reviewText && (
                <div className="pt-3 border-t border-cyan-200">
                  <p className="text-cyan-600 text-sm mb-1">Your review:</p>
                  <p className="text-cyan-800 text-sm">"{reviewText}"</p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-700">
              <p className="font-medium mb-1">Privacy Notice</p>
              <p>
                Your review is anonymous. We do not collect or display any personal 
                information. Reviews are moderated before being published.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('review')}
                className="border-cyan-600 text-cyan-700"
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
