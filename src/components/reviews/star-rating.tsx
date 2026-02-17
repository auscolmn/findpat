'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeConfig = {
  sm: { star: 'h-4 w-4', gap: 'gap-0.5' },
  md: { star: 'h-6 w-6', gap: 'gap-1' },
  lg: { star: 'h-8 w-8', gap: 'gap-1.5' },
};

const ratingLabels = [
  '',
  'Poor',
  'Fair',
  'Good',
  'Very Good',
  'Excellent',
];

export function StarRating({ 
  value, 
  onChange, 
  readonly = false, 
  size = 'md',
  showLabel = false 
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const config = sizeConfig[size];
  
  const displayValue = hoverValue || value;

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          'flex items-center',
          config.gap,
          !readonly && 'cursor-pointer'
        )}
        onMouseLeave={() => !readonly && setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            className={cn(
              'transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded',
              !readonly && 'hover:scale-110'
            )}
          >
            <Star
              className={cn(
                config.star,
                'transition-colors duration-150',
                star <= displayValue
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-gray-300'
              )}
            />
          </button>
        ))}
      </div>
      
      {showLabel && displayValue > 0 && (
        <span className={cn(
          'text-sm mt-1',
          displayValue >= 4 ? 'text-green-600' : 
          displayValue >= 3 ? 'text-cyan-600' : 
          displayValue >= 2 ? 'text-amber-600' : 'text-red-600'
        )}>
          {ratingLabels[displayValue]}
        </span>
      )}
    </div>
  );
}

// Display-only version with number
export function StarRatingDisplay({ 
  rating, 
  reviewCount,
  size = 'sm' 
}: { 
  rating: number; 
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const config = sizeConfig[size];
  
  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex items-center', config.gap)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              config.star,
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                  ? 'fill-amber-200 text-amber-400'
                  : 'fill-transparent text-gray-300'
            )}
          />
        ))}
      </div>
      <span className="font-semibold text-cyan-900">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-cyan-600 text-sm">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
