import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VerificationBadge, getCardBorderClass } from '@/components/verification-badge';
import { Clinic, TREATMENT_TYPE_LABELS, INSURANCE_LABELS } from '@/types/clinic';
import { MODALITY_LABELS } from '@/types';
import { MapPin, Phone, Globe, Users, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClinicCardProps {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card 
      className={cn(
        'overflow-hidden shadow-neumorphic hover:shadow-raised transition-shadow',
        getCardBorderClass(clinic.verificationTier)
      )}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-inset">
            {clinic.logoUrl ? (
              <Image
                src={clinic.logoUrl}
                alt={clinic.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="h-full w-full bg-teal-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-teal-600">
                  {clinic.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-cyan-900 truncate">
                {clinic.name}
              </h3>
              <VerificationBadge tier={clinic.verificationTier} size="sm" />
            </div>

            <div className="flex items-center gap-1 text-sm text-cyan-600 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{clinic.location.city}, {clinic.location.state}</span>
            </div>

            {/* Treatment Types */}
            <div className="flex items-center gap-1 text-sm text-cyan-500 mb-2">
              <Users className="h-3.5 w-3.5" />
              <span>
                {clinic.treatmentTypes.slice(0, 2).map(t => TREATMENT_TYPE_LABELS[t]).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-cyan-700 mt-3 line-clamp-2">
          {clinic.description.split('\n\n')[0]}
        </p>

        {/* Modality Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {clinic.modalities.slice(0, 4).map((modality) => (
            <Badge
              key={modality}
              variant="secondary"
              className="bg-teal-100 text-teal-700 hover:bg-teal-200 text-xs"
            >
              {MODALITY_LABELS[modality]}
            </Badge>
          ))}
        </div>

        {/* Insurance & Features */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-cyan-600">
          {clinic.insuranceAccepted.length > 0 && (
            <div className="flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5" />
              <span>
                {clinic.insuranceAccepted.slice(0, 2).map(i => INSURANCE_LABELS[i]).join(', ')}
                {clinic.insuranceAccepted.length > 2 && ` +${clinic.insuranceAccepted.length - 2}`}
              </span>
            </div>
          )}
          {clinic.bulkBillingAvailable && (
            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
              Bulk Billing
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-cyan-100">
          <div className="flex items-center gap-3 text-sm text-cyan-600">
            {clinic.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{clinic.phone}</span>
              </div>
            )}
            {clinic.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
              </div>
            )}
          </div>

          <Link href={`/clinic/${clinic.slug}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="border-teal-600 text-teal-700 hover:bg-teal-50"
            >
              View Clinic
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
