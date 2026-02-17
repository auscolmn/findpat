'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PractitionerCard } from '@/components/practitioner-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { samplePractitioners, searchPractitioners } from '@/data/practitioners';
import {
  Modality,
  Specialty,
  PractitionerRole,
  VerificationTier,
  MODALITY_LABELS,
  SPECIALTY_LABELS,
  ROLE_LABELS,
  TIER_LABELS,
} from '@/types';
import { Search, Filter, X, Users, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // User type (client or practitioner)
  const [userType, setUserType] = useState<'client' | 'practitioner'>(
    (searchParams.get('userType') as 'client' | 'practitioner') || 'client'
  );

  // Filters
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<PractitionerRole[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<VerificationTier[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Update URL when userType changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('userType', userType);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [userType, searchParams, router]);

  // Filter practitioners
  const filteredPractitioners = useMemo(() => {
    return searchPractitioners(samplePractitioners, {
      userType,
      location,
      modalities: selectedModalities,
      specialties: selectedSpecialties,
      roles: selectedRoles,
      verificationTiers: selectedTiers,
      lookingToCollaborate: userType === 'practitioner',
    });
  }, [
    userType,
    location,
    selectedModalities,
    selectedSpecialties,
    selectedRoles,
    selectedTiers,
  ]);

  const toggleModality = (modality: Modality) => {
    setSelectedModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality]
    );
  };

  const toggleSpecialty = (specialty: Specialty) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleRole = (role: PractitionerRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleTier = (tier: VerificationTier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const clearFilters = () => {
    setLocation('');
    setSelectedModalities([]);
    setSelectedSpecialties([]);
    setSelectedRoles([]);
    setSelectedTiers([]);
  };

  const hasActiveFilters =
    location ||
    selectedModalities.length > 0 ||
    selectedSpecialties.length > 0 ||
    selectedRoles.length > 0 ||
    selectedTiers.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        {/* User Type Selector */}
        <section className="bg-white border-b border-cyan-200 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={userType === 'client' ? 'default' : 'outline'}
                onClick={() => setUserType('client')}
                className={cn(
                  'gap-2',
                  userType === 'client'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'border-cyan-300 text-cyan-700'
                )}
              >
                <Heart className="h-4 w-4" />
                Seeking Treatment
              </Button>
              <Button
                variant={userType === 'practitioner' ? 'default' : 'outline'}
                onClick={() => setUserType('practitioner')}
                className={cn(
                  'gap-2',
                  userType === 'practitioner'
                    ? 'bg-cyan-600 hover:bg-cyan-700'
                    : 'border-cyan-300 text-cyan-700'
                )}
              >
                <Users className="h-4 w-4" />
                Finding Collaborators
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cyan-900 mb-2">
              {userType === 'client'
                ? 'Find a PAT Practitioner'
                : 'Find Collaborators'}
            </h1>
            <p className="text-cyan-600">
              {userType === 'client'
                ? 'Search verified practitioners by location, specialty, and modality'
                : 'Connect with practitioners looking to collaborate on patient care'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside
              className={cn(
                'lg:w-72 flex-shrink-0',
                showFilters ? 'block' : 'hidden lg:block'
              )}
            >
              <Card className="shadow-neumorphic sticky top-40">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-cyan-900">Filters</h2>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-cyan-600 hover:text-cyan-800"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Location */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Location
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                      <Input
                        type="text"
                        placeholder="City or state..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-white border-cyan-200"
                      />
                    </div>
                  </div>

                  {/* Modalities */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Modality
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(MODALITY_LABELS) as Modality[])
                        .slice(0, 6)
                        .map((modality) => (
                          <Badge
                            key={modality}
                            variant={
                              selectedModalities.includes(modality)
                                ? 'default'
                                : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors',
                              selectedModalities.includes(modality)
                                ? 'bg-cyan-600 hover:bg-cyan-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleModality(modality)}
                          >
                            {MODALITY_LABELS[modality]}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Specialty
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(SPECIALTY_LABELS) as Specialty[])
                        .slice(0, 6)
                        .map((specialty) => (
                          <Badge
                            key={specialty}
                            variant={
                              selectedSpecialties.includes(specialty)
                                ? 'default'
                                : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors text-xs',
                              selectedSpecialties.includes(specialty)
                                ? 'bg-cyan-600 hover:bg-cyan-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleSpecialty(specialty)}
                          >
                            {SPECIALTY_LABELS[specialty]}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Role */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Role
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(ROLE_LABELS) as PractitionerRole[]).map(
                        (role) => (
                          <Badge
                            key={role}
                            variant={
                              selectedRoles.includes(role) ? 'default' : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors text-xs',
                              selectedRoles.includes(role)
                                ? 'bg-cyan-600 hover:bg-cyan-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleRole(role)}
                          >
                            {ROLE_LABELS[role]}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  {/* Verification Level */}
                  <div>
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Verification Level
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(TIER_LABELS) as VerificationTier[]).map(
                        (tier) => (
                          <Badge
                            key={tier}
                            variant={
                              selectedTiers.includes(tier) ? 'default' : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors',
                              selectedTiers.includes(tier)
                                ? tier === 'certified'
                                  ? 'bg-gradient-gold text-cyan-900'
                                  : tier === 'verified'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-cyan-400 text-cyan-900'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleTier(tier)}
                          >
                            {TIER_LABELS[tier]}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full border-cyan-300 text-cyan-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-cyan-600">
                      {selectedModalities.length +
                        selectedSpecialties.length +
                        selectedRoles.length +
                        selectedTiers.length +
                        (location ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-cyan-700">
                  <span className="font-semibold">
                    {filteredPractitioners.length}
                  </span>{' '}
                  practitioner{filteredPractitioners.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Results Grid */}
              {filteredPractitioners.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {filteredPractitioners.map((practitioner) => (
                    <PractitionerCard
                      key={practitioner.id}
                      practitioner={practitioner}
                      showCollaborationBadge={userType === 'practitioner'}
                    />
                  ))}
                </div>
              ) : (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cyan-900 mb-2">
                      No practitioners found
                    </h3>
                    <p className="text-cyan-600 mb-4">
                      Try adjusting your filters or search in a different location
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="border-cyan-600 text-cyan-700"
                    >
                      Clear all filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
