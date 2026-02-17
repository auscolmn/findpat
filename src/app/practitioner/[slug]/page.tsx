import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { VerificationBadge, getCardBorderClass } from '@/components/verification-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { samplePractitioners } from '@/data/practitioners';
import {
  MODALITY_LABELS,
  SPECIALTY_LABELS,
  ROLE_LABELS,
  SERVICE_TYPE_CONFIG,
  COVERAGE_CONFIG,
} from '@/types';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Calendar,
  CheckCircle,
  Users,
  Shield,
  Languages,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PractitionerProfilePage({ params }: Props) {
  const { slug } = await params;
  const practitioner = samplePractitioners.find((p) => p.slug === slug);

  if (!practitioner) {
    notFound();
  }

  const availabilityConfig = {
    accepting: {
      label: 'Accepting new clients',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      dot: 'bg-green-500',
    },
    waitlist: {
      label: 'Waitlist only',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      dot: 'bg-amber-500',
    },
    not_accepting: {
      label: 'Not accepting new clients',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      dot: 'bg-gray-400',
    },
  };

  const availability = availabilityConfig[practitioner.availability];

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Back Link */}
          <Link
            href="/search"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to search results
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header Card */}
              <Card
                className={cn(
                  'overflow-hidden shadow-neumorphic',
                  getCardBorderClass(practitioner.verificationTier)
                )}
              >
                {/* Gold bar for certified */}
                {practitioner.verificationTier === 'certified' && (
                  <div className="h-2 bg-gradient-gold" />
                )}

                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Photo */}
                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl shadow-raised mx-auto sm:mx-0">
                      {practitioner.photoUrl ? (
                        <Image
                          src={practitioner.photoUrl}
                          alt={practitioner.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                          priority
                        />
                      ) : (
                        <div className="h-full w-full bg-cyan-100 flex items-center justify-center">
                          <span className="text-4xl font-semibold text-cyan-600">
                            {practitioner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                        <h1 className="text-2xl font-bold text-cyan-900">
                          {practitioner.name}
                        </h1>
                        <VerificationBadge
                          tier={practitioner.verificationTier}
                          size="md"
                        />
                      </div>

                      <p className="text-cyan-700 mb-2">
                        {ROLE_LABELS[practitioner.role]}
                        {practitioner.licenseType && ` · ${practitioner.licenseType}`}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-1 text-cyan-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {practitioner.location.city}, {practitioner.location.state}
                        </span>
                      </div>

                      <div
                        className={cn(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
                          availability.bgColor,
                          availability.color
                        )}
                      >
                        <span
                          className={cn('h-2 w-2 rounded-full', availability.dot)}
                        />
                        <span className="text-sm font-medium">
                          {availability.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-cyan-100">
                    {practitioner.bookingUrl && (
                      <a
                        href={practitioner.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                          <Calendar className="h-4 w-4" />
                          Book Consultation
                        </Button>
                      </a>
                    )}
                    {practitioner.website && (
                      <a
                        href={practitioner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-cyan-600 text-cyan-700 gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Website
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
                    {practitioner.bio.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-cyan-700 mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verified Credentials */}
              {practitioner.credentials.length > 0 && (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-cyan-900 mb-4">
                      {practitioner.verificationTier === 'listed'
                        ? 'Credentials'
                        : 'Verified Credentials'}
                    </h2>
                    <div className="space-y-3">
                      {practitioner.credentials.map((credential) => (
                        <div
                          key={credential.id}
                          className="p-4 rounded-lg bg-cyan-50 border-l-4 border-l-green-500"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="font-medium text-cyan-900">
                                  {credential.name}
                                </span>
                              </div>
                              <p className="text-sm text-cyan-600 ml-6">
                                {credential.issuer}
                              </p>
                              {credential.certificateId && (
                                <p className="text-xs text-cyan-500 ml-6 font-mono mt-1">
                                  Certificate #{credential.certificateId}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  credential.status === 'active'
                                    ? 'default'
                                    : 'secondary'
                                }
                                className={cn(
                                  credential.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                )}
                              >
                                {credential.status === 'active'
                                  ? 'Active'
                                  : credential.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {practitioner.verificationTier === 'listed' && (
                      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-sm text-amber-700">
                          ⚠️ These credentials are self-reported and have not yet
                          been verified by FindPAT.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Service Types */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cyan-900 mb-3">Services Offered</h3>
                  <div className="space-y-2">
                    {practitioner.serviceTypes.map((serviceType) => (
                      <div
                        key={serviceType}
                        className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg"
                      >
                        <span className="text-lg">{SERVICE_TYPE_CONFIG[serviceType].emoji}</span>
                        <span className="text-indigo-700 font-medium">
                          {SERVICE_TYPE_CONFIG[serviceType].label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coverage */}
              {practitioner.coverage.length > 0 && (
                <Card className="shadow-neumorphic border-green-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      Coverage Accepted
                    </h3>
                    <div className="space-y-2">
                      {practitioner.coverage.map((coverage) => (
                        <div
                          key={coverage}
                          className={cn(
                            'flex items-center gap-2 p-2 rounded-lg border',
                            COVERAGE_CONFIG[coverage].color
                          )}
                        >
                          <span className="text-lg">{COVERAGE_CONFIG[coverage].emoji}</span>
                          <span className="font-medium">
                            {COVERAGE_CONFIG[coverage].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Modalities */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cyan-900 mb-3">Modalities</h3>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.modalities.map((modality) => (
                      <Badge
                        key={modality}
                        variant="secondary"
                        className="bg-cyan-100 text-cyan-700"
                      >
                        {MODALITY_LABELS[modality]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cyan-900 mb-3">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="border-cyan-200 text-cyan-700"
                      >
                        {SPECIALTY_LABELS[specialty]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              {practitioner.languages && practitioner.languages.length > 0 && (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Languages
                    </h3>
                    <p className="text-cyan-700">
                      {practitioner.languages.join(', ')}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Collaboration */}
              {practitioner.lookingToCollaborate && (
                <Card className="shadow-neumorphic border-purple-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      Open to Collaboration
                    </h3>
                    <p className="text-cyan-600 text-sm mb-3">
                      Looking to connect with:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {practitioner.collaborationRoles?.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className="border-purple-200 text-purple-700"
                        >
                          {ROLE_LABELS[role]}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Trust Footer */}
              <Card className="shadow-neumorphic bg-cyan-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-cyan-700">
                        {practitioner.verificationTier === 'certified' ||
                        practitioner.verificationTier === 'verified'
                          ? "This practitioner's credentials have been verified by FindPAT."
                          : 'This profile has not yet been verified. Credentials are self-reported.'}
                      </p>
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
  return samplePractitioners.map((p) => ({
    slug: p.slug,
  }));
}
