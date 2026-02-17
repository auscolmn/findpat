import { cn } from '@/lib/utils';
import { VerificationTier } from '@/types';
import { Star, CheckCircle, Circle } from 'lucide-react';

interface VerificationBadgeProps {
  tier: VerificationTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const tierConfig = {
  certified: {
    label: 'Certified',
    icon: Star,
    bgClass: 'bg-gradient-gold',
    textClass: 'text-cyan-900',
    shadowClass: 'shadow-gold-glow',
    borderClass: 'border-l-4 border-l-amber-400',
  },
  verified: {
    label: 'Verified',
    icon: CheckCircle,
    bgClass: 'bg-green-600',
    textClass: 'text-white',
    shadowClass: 'shadow-green-glow',
    borderClass: 'border-l-4 border-l-green-500',
  },
  listed: {
    label: 'Listed',
    icon: Circle,
    bgClass: 'bg-cyan-400',
    textClass: 'text-cyan-900',
    shadowClass: 'shadow-cyan-glow',
    borderClass: 'border-l-4 border-l-cyan-400',
  },
};

const sizeConfig = {
  sm: {
    badge: 'px-2 py-0.5 text-xs gap-1',
    icon: 'h-3 w-3',
  },
  md: {
    badge: 'px-3 py-1 text-sm gap-1.5',
    icon: 'h-4 w-4',
  },
  lg: {
    badge: 'px-4 py-1.5 text-base gap-2',
    icon: 'h-5 w-5',
  },
};

export function VerificationBadge({ tier, size = 'md', showLabel = true }: VerificationBadgeProps) {
  const config = tierConfig[tier];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        config.bgClass,
        config.textClass,
        config.shadowClass,
        sizes.badge
      )}
    >
      <Icon className={sizes.icon} fill={tier === 'certified' ? 'currentColor' : 'none'} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export function getCardBorderClass(tier: VerificationTier): string {
  return tierConfig[tier].borderClass;
}
