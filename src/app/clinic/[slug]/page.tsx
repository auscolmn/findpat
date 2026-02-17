import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { VerificationBadge, getCardBorderClass } from '@/components/verification-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleClinics } from '@/data/clinics';
import { samplePractitioners } from '@/data/practitioners';
import { PractitionerCard } from '@/components/practitioner-card';
import {
  MODALITY_LABELS,
} from '@/types';
import {
  TREATMENT_TYPE_LABELS,
  INSURANCE_LABELS,
} from '@/types/clinic';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Shield,
  ExternalLink,
  CreditCard,
  Users,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ClinicProfilePage({ params }: Props) {
  const { slug } = await params;
  const clinic = sampleClinics.find((c) => c.slug === slug);

  if (!clinic) {
    notFound();
  }

  // Get team members (in real app, this would come from the database)
  // For demo, we'll show practitioners from the same state
  const teamMembers = samplePractitioners.filter(
    (p) => p.location.state === clinic.location.state
  ).slice(0, 4);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        {clinic.heroImageUrl && (
          <div className="relative h-48 md:h-64 w-full">
            <Image
              src={clinic.heroImageUrl}
              alt={clinic.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 py-6">
          {/* Back Link */}
          <Link
            href="/clinics"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to clinic search
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header Card */}
              <Card
                className={cn(
                  'overflow-hidden shadow-neumorphic -mt-20 md:-mt-24 relative z-10',
                  getCardBorderClass(clinic.verificationTier)
                )}
              >
                {/* Gold bar for certified */}
                {clinic.verificationTier === 'certified' && (
                  <div className="h-2 bg-gradient-gold" />
                )}

                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Logo */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl shadow-raised mx-auto sm:mx-0 bg-white">
                      {clinic.logoUrl ? (
                        <Image
                          src={clinic.logoUrl}
                          alt={clinic.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                          priority
                        />
                      ) : (
                        <div className="h-full w-full bg-teal-100 flex items-center justify-center">
                          <Building2 className="h-10 w-10 text-teal-600" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                        <h1 className="text-2xl font-bold text-cyan-900">
                          {clinic.name}
                        </h1>
                        <VerificationBadge
                          tier={clinic.verificationTier}
                          size="md"
                        />
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-1 text-cyan-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {clinic.location.address}, {clinic.location.city}, {clinic.location.state} {clinic.location.postcode}
                        </span>
                      </div>

                      {/* Treatment Types */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                        {clinic.treatmentTypes.map((type) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="border-teal-200 text-teal-700"
                          >
                            {TREATMENT_TYPE_LABELS[type]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-cyan-100">
                    {clinic.bookingUrl && (
                      <a
                        href={clinic.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 gap-2">
                          <Calendar className="h-4 w-4" />
                          Book Appointment
                        </Button>
                      </a>
                    )}
                    {clinic.phone && (
                      <a href={`tel:${clinic.phone}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-teal-600 text-teal-700 gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          {clinic.phone}
                        </Button>
                      </a>
                    )}
                    {clinic.website && (
                      <a
                        href={clinic.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-cyan-600 text-cyan-700 gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-cyan-900 mb-4">
                    About
                  </h2>
                  <div className="prose prose-cyan max-w-none">
                    {clinic.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-cyan-700 mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Services Section */}
              {clinic.servicesDescription && (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-cyan-900 mb-4">
                      Services
                    </h2>
                    <p className="text-cyan-700 mb-4">
                      {clinic.servicesDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {clinic.modalities.map((modality) => (
                        <Badge
                          key={modality}
                          variant="secondary"
                          className="bg-teal-100 text-teal-700"
                        >
                          {MODALITY_LABELS[modality]}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team Members */}
              {teamMembers.length > 0 && (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-cyan-900 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Our Team
                      </h2>
                      <span className="text-sm text-cyan-600">
                        {teamMembers.length} practitioners
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {teamMembers.map((practitioner) => (
                        <PractitionerCard
                          key={practitioner.id}
                          practitioner={practitioner}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cyan-900 mb-4">Contact</h3>
                  <div className="space-y-3">
                    {clinic.phone && (
                      <a
                        href={`tel:${clinic.phone}`}
                        className="flex items-center gap-3 text-cyan-700 hover:text-cyan-900"
                      >
                        <Phone className="h-4 w-4 text-cyan-500" />
                        <span>{clinic.phone}</span>
                      </a>
                    )}
                    {clinic.email && (
                      <a
                        href={`mailto:${clinic.email}`}
                        className="flex items-center gap-3 text-cyan-700 hover:text-cyan-900"
                      >
                        <Mail className="h-4 w-4 text-cyan-500" />
                        <span>{clinic.email}</span>
                      </a>
                    )}
                    {clinic.website && (
                      <a
                        href={clinic.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-cyan-700 hover:text-cyan-900"
                      >
                        <Globe className="h-4 w-4 text-cyan-500" />
                        <span className="truncate">{clinic.website.replace('https://', '')}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Operating Hours */}
              {clinic.operatingHours && (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-cyan-900 mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Operating Hours
                    </h3>
                    <div className="space-y-2 text-sm">
                      {daysOfWeek.map((day) => {
                        const hours = clinic.operatingHours?.[day];
                        return (
                          <div key={day} className="flex justify-between">
                            <span className="text-cyan-600 capitalize">{day}</span>
                            <span className="text-cyan-700">
                              {hours ? `${formatTime(hours.open)} - ${formatTime(hours.close)}` : 'Closed'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Insurance & Payment */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cyan-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Options
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {clinic.insuranceAccepted.map((insurance) => (
                      <Badge
                        key={insurance}
                        variant="outline"
                        className="border-green-200 text-green-700"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {INSURANCE_LABELS[insurance]}
                      </Badge>
                    ))}
                  </div>
                  {clinic.bulkBillingAvailable && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Bulk billing available</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-neumorphic overflow-hidden">
                <div className="h-48 bg-cyan-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm text-cyan-600">{clinic.location.city}, {clinic.location.state}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${clinic.location.address}, ${clinic.location.city}, ${clinic.location.state} ${clinic.location.postcode}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 hover:text-teal-800 underline mt-2 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </Card>

              {/* Trust Footer */}
              <Card className="shadow-neumorphic bg-cyan-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-cyan-700">
                        {clinic.verificationTier === 'certified' ||
                        clinic.verificationTier === 'verified'
                          ? "This clinic's registration and credentials have been verified by FindPAT."
                          : 'This clinic has not yet been verified. Information is self-reported.'}
                      </p>
                      {clinic.abnNumber && clinic.verificationTier !== 'listed' && (
                        <p className="text-xs text-cyan-500 mt-2 font-mono">
                          ABN: {clinic.abnNumber}
                        </p>
                      )}
                      <Link
                        href="/how-it-works"
                        className="text-sm text-cyan-600 hover:text-cyan-800 inline-flex items-center gap-1 mt-2"
                      >
                        Learn about verification
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return sampleClinics.map((c) => ({
    slug: c.slug,
  }));
}
