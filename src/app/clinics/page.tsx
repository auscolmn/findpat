'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ClinicCard } from '@/components/clinic-card';
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
import { sampleClinics, searchClinics, AUSTRALIAN_STATES } from '@/data/clinics';
import {
  Modality,
  VerificationTier,
  MODALITY_LABELS,
  TIER_LABELS,
  TreatmentType,
  InsuranceAccepted,
  TREATMENT_TYPE_LABELS,
  INSURANCE_LABELS,
} from '@/types';
import { Search, Filter, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ClinicsPage() {
  // Filters
  const [location, setLocation] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const [selectedTreatmentTypes, setSelectedTreatmentTypes] = useState<TreatmentType[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceAccepted[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<VerificationTier[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter clinics
  const filteredClinics = useMemo(() => {
    return searchClinics(sampleClinics, {
      location,
      state: selectedState || undefined,
      modalities: selectedModalities,
      treatmentTypes: selectedTreatmentTypes,
      insuranceAccepted: selectedInsurance,
      verificationTiers: selectedTiers,
    });
  }, [
    location,
    selectedState,
    selectedModalities,
    selectedTreatmentTypes,
    selectedInsurance,
    selectedTiers,
  ]);

  const toggleModality = (modality: Modality) => {
    setSelectedModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality]
    );
  };

  const toggleTreatmentType = (type: TreatmentType) => {
    setSelectedTreatmentTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleInsurance = (insurance: InsuranceAccepted) => {
    setSelectedInsurance((prev) =>
      prev.includes(insurance)
        ? prev.filter((i) => i !== insurance)
        : [...prev, insurance]
    );
  };

  const toggleTier = (tier: VerificationTier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const clearFilters = () => {
    setLocation('');
    setSelectedState('');
    setSelectedModalities([]);
    setSelectedTreatmentTypes([]);
    setSelectedInsurance([]);
    setSelectedTiers([]);
  };

  const hasActiveFilters =
    location ||
    selectedState ||
    selectedModalities.length > 0 ||
    selectedTreatmentTypes.length > 0 ||
    selectedInsurance.length > 0 ||
    selectedTiers.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cyan-900 mb-2 flex items-center gap-2">
              <Building2 className="h-7 w-7 text-teal-600" />
              Find a PAT Clinic
            </h1>
            <p className="text-cyan-600">
              Discover treatment facilities offering psychedelic-assisted therapy across Australia
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
              <Card className="shadow-neumorphic sticky top-24">
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
                        placeholder="City or postcode..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-white border-cyan-200"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      State
                    </Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="bg-white border-cyan-200">
                        <SelectValue placeholder="All states" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All states</SelectItem>
                        {AUSTRALIAN_STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                                ? 'bg-teal-600 hover:bg-teal-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleModality(modality)}
                          >
                            {MODALITY_LABELS[modality]}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Treatment Types */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Treatment Type
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(TREATMENT_TYPE_LABELS) as TreatmentType[]).map(
                        (type) => (
                          <Badge
                            key={type}
                            variant={
                              selectedTreatmentTypes.includes(type)
                                ? 'default'
                                : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors text-xs',
                              selectedTreatmentTypes.includes(type)
                                ? 'bg-teal-600 hover:bg-teal-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleTreatmentType(type)}
                          >
                            {TREATMENT_TYPE_LABELS[type]}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="mb-5">
                    <Label className="text-sm font-medium text-cyan-800 mb-2 block">
                      Insurance Accepted
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(INSURANCE_LABELS) as InsuranceAccepted[]).map(
                        (insurance) => (
                          <Badge
                            key={insurance}
                            variant={
                              selectedInsurance.includes(insurance)
                                ? 'default'
                                : 'outline'
                            }
                            className={cn(
                              'cursor-pointer transition-colors text-xs',
                              selectedInsurance.includes(insurance)
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                            )}
                            onClick={() => toggleInsurance(insurance)}
                          >
                            {INSURANCE_LABELS[insurance]}
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
                    <Badge className="ml-2 bg-teal-600">
                      {selectedModalities.length +
                        selectedTreatmentTypes.length +
                        selectedInsurance.length +
                        selectedTiers.length +
                        (location ? 1 : 0) +
                        (selectedState ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-cyan-700">
                  <span className="font-semibold">
                    {filteredClinics.length}
                  </span>{' '}
                  clinic{filteredClinics.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Results Grid */}
              {filteredClinics.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {filteredClinics.map((clinic) => (
                    <ClinicCard
                      key={clinic.id}
                      clinic={clinic}
                    />
                  ))}
                </div>
              ) : (
                <Card className="shadow-neumorphic">
                  <CardContent className="p-12 text-center">
                    <Building2 className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cyan-900 mb-2">
                      No clinics found
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
