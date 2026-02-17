import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VerificationBadge, getCardBorderClass } from '@/components/verification-badge';
import { Practitioner, MODALITY_LABELS, SPECIALTY_LABELS, ROLE_LABELS, SERVICE_TYPE_CONFIG, COVERAGE_CONFIG } from '@/types';
import { MapPin, CheckCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PractitionerCardProps {
  practitioner: Practitioner;
  showCollaborationBadge?: boolean;
}

export function PractitionerCard({ practitioner, showCollaborationBadge = false }: PractitionerCardProps) {
  const availabilityConfig = {
    accepting: {
      label: 'Accepting new clients',
      color: 'text-green-600',
      dot: 'bg-green-500',
    },
    waitlist: {
      label: 'Waitlist only',
      color: 'text-amber-600',
      dot: 'bg-amber-500',
    },
    not_accepting: {
      label: 'Not accepting',
      color: 'text-gray-500',
      dot: 'bg-gray-400',
    },
  };

  const availability = availabilityConfig[practitioner.availability];

  return (
    <Card 
      className={cn(
        'overflow-hidden shadow-neumorphic hover:shadow-raised transition-shadow',
        getCardBorderClass(practitioner.verificationTier)
      )}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Photo */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-inset">
            {practitioner.photoUrl ? (
              <Image
                src={practitioner.photoUrl}
                alt={practitioner.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="h-full w-full bg-cyan-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-cyan-600">
                  {practitioner.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-cyan-900 truncate">
                {practitioner.name}
              </h3>
              <VerificationBadge tier={practitioner.verificationTier} size="sm" />
            </div>

            <p className="text-sm text-cyan-700 mb-1">
              {ROLE_LABELS[practitioner.role]}
            </p>

            <div className="flex items-center gap-1 text-sm text-cyan-600 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{practitioner.location.city}, {practitioner.location.state}</span>
            </div>

            {/* Clinic affiliation */}
            {practitioner.clinicName && (
              <div className="flex items-center gap-1 text-sm text-teal-600 mb-2">
                <span>Works at </span>
                <Link 
                  href={`/clinic/${practitioner.clinicSlug}`}
                  className="font-medium hover:underline"
                >
                  {practitioner.clinicName}
                </Link>
              </div>
            )}

            {/* Collaboration badge */}
            {showCollaborationBadge && practitioner.lookingToCollaborate && (
              <div className="flex items-center gap-1 text-sm text-purple-600 mb-2">
                <Users className="h-3.5 w-3.5" />
                <span>Open to collaboration</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-sm text-cyan-700 mt-3 line-clamp-2">
          {practitioner.bio}
        </p>

        {/* Service Types & Coverage */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {practitioner.serviceTypes.map((serviceType) => (
            <Badge
              key={serviceType}
              variant="secondary"
              className="bg-indigo-50 text-indigo-700 text-xs"
            >
              {SERVICE_TYPE_CONFIG[serviceType].emoji} {SERVICE_TYPE_CONFIG[serviceType].label}
            </Badge>
          ))}
          {practitioner.coverage.map((coverage) => (
            <Badge
              key={coverage}
              variant="outline"
              className={cn('text-xs', COVERAGE_CONFIG[coverage].color)}
            >
              {COVERAGE_CONFIG[coverage].emoji} {COVERAGE_CONFIG[coverage].label}
            </Badge>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {practitioner.modalities.slice(0, 3).map((modality) => (
            <Badge
              key={modality}
              variant="secondary"
              className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 text-xs"
            >
              {MODALITY_LABELS[modality]}
            </Badge>
          ))}
          {practitioner.specialties.slice(0, 2).map((specialty) => (
            <Badge
              key={specialty}
              variant="outline"
              className="border-cyan-200 text-cyan-700 text-xs"
            >
              {SPECIALTY_LABELS[specialty]}
            </Badge>
          ))}
        </div>

        {/* Credentials preview */}
        {practitioner.verificationTier !== 'listed' && practitioner.credentials.length > 0 && (
          <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="truncate">
              {practitioner.credentials[0].name}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-cyan-100">
          <div className={cn('flex items-center gap-1.5 text-sm', availability.color)}>
            <span className={cn('h-2 w-2 rounded-full', availability.dot)} />
            <span>{availability.label}</span>
          </div>

          <Link href={`/practitioner/${practitioner.slug}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="border-cyan-600 text-cyan-700 hover:bg-cyan-50"
            >
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
