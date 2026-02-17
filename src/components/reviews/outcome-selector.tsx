'use client';

import { cn } from '@/lib/utils';
import { 
  OutcomeRating, 
  OUTCOME_RATING_LABELS, 
  OUTCOME_RATING_EMOJI,
  OUTCOME_RATING_COLORS 
} from '@/types/reviews';

interface OutcomeSelectorProps {
  value: OutcomeRating | null;
  onChange: (outcome: OutcomeRating) => void;
}

const outcomes: OutcomeRating[] = [
  'life_changing',
  'significant_improvement',
  'moderate_improvement',
  'slight_improvement',
  'no_change',
  'got_worse',
];

export function OutcomeSelector({ value, onChange }: OutcomeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {outcomes.map((outcome) => (
          <button
            key={outcome}
            type="button"
            onClick={() => onChange(outcome)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left',
              value === outcome
                ? cn('border-cyan-500 ring-2 ring-cyan-200', OUTCOME_RATING_COLORS[outcome])
                : 'border-gray-200 hover:border-cyan-300 bg-white'
            )}
          >
            <span className="text-xl">{OUTCOME_RATING_EMOJI[outcome]}</span>
            <span className={cn(
              'font-medium text-sm',
              value === outcome ? '' : 'text-gray-700'
            )}>
              {OUTCOME_RATING_LABELS[outcome]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Display badge for showing outcome
export function OutcomeBadge({ outcome }: { outcome: OutcomeRating }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium border',
      OUTCOME_RATING_COLORS[outcome]
    )}>
      <span>{OUTCOME_RATING_EMOJI[outcome]}</span>
      <span>{OUTCOME_RATING_LABELS[outcome]}</span>
    </span>
  );
}
