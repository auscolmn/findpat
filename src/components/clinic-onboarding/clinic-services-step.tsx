'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Stethoscope, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Modality, 
  MODALITY_LABELS,
  TreatmentType,
  InsuranceAccepted,
  TREATMENT_TYPE_LABELS,
  INSURANCE_LABELS,
} from '@/types';

interface ClinicServicesData {
  modalities: Modality[];
  treatmentTypes: TreatmentType[];
  insuranceAccepted: InsuranceAccepted[];
  bulkBillingAvailable: boolean;
  servicesDescription: string;
}

interface ClinicServicesStepProps {
  initialData?: Partial<ClinicServicesData>;
  onSubmit: (data: ClinicServicesData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

export function ClinicServicesStep({ 
  initialData, 
  onSubmit,
  onBack,
  isLoading = false,
}: ClinicServicesStepProps) {
  const [formData, setFormData] = useState<ClinicServicesData>({
    modalities: initialData?.modalities || [],
    treatmentTypes: initialData?.treatmentTypes || [],
    insuranceAccepted: initialData?.insuranceAccepted || [],
    bulkBillingAvailable: initialData?.bulkBillingAvailable || false,
    servicesDescription: initialData?.servicesDescription || '',
  });
  const [error, setError] = useState<string | null>(null);

  const toggleModality = (modality: Modality) => {
    setFormData((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modality)
        ? prev.modalities.filter((m) => m !== modality)
        : [...prev.modalities, modality],
    }));
  };

  const toggleTreatmentType = (type: TreatmentType) => {
    setFormData((prev) => ({
      ...prev,
      treatmentTypes: prev.treatmentTypes.includes(type)
        ? prev.treatmentTypes.filter((t) => t !== type)
        : [...prev.treatmentTypes, type],
    }));
  };

  const toggleInsurance = (insurance: InsuranceAccepted) => {
    setFormData((prev) => ({
      ...prev,
      insuranceAccepted: prev.insuranceAccepted.includes(insurance)
        ? prev.insuranceAccepted.filter((i) => i !== insurance)
        : [...prev.insuranceAccepted, insurance],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.modalities.length === 0) {
      setError('Please select at least one modality');
      return;
    }

    if (formData.treatmentTypes.length === 0) {
      setError('Please select at least one treatment type');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Card className="shadow-neumorphic max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="h-8 w-8 text-teal-600" />
        </div>
        <CardTitle className="text-2xl text-cyan-900">Services Offered</CardTitle>
        <CardDescription className="text-cyan-600">
          What treatments and services do you provide?
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Modalities */}
          <div>
            <Label className="text-cyan-800 mb-3 block">
              Modalities *
            </Label>
            <p className="text-sm text-cyan-600 mb-3">
              Select all substances/modalities you offer treatments with
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MODALITY_LABELS) as Modality[]).map((modality) => (
                <Badge
                  key={modality}
                  variant={formData.modalities.includes(modality) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors px-3 py-1.5',
                    formData.modalities.includes(modality)
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
          <div>
            <Label className="text-cyan-800 mb-3 block">
              Treatment Types *
            </Label>
            <p className="text-sm text-cyan-600 mb-3">
              What formats of treatment do you offer?
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TREATMENT_TYPE_LABELS) as TreatmentType[]).map((type) => (
                <Badge
                  key={type}
                  variant={formData.treatmentTypes.includes(type) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors px-3 py-1.5',
                    formData.treatmentTypes.includes(type)
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                  )}
                  onClick={() => toggleTreatmentType(type)}
                >
                  {TREATMENT_TYPE_LABELS[type]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <Label className="text-cyan-800 mb-3 block">
              Insurance & Payment
            </Label>
            <p className="text-sm text-cyan-600 mb-3">
              Select all payment methods you accept
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(INSURANCE_LABELS) as InsuranceAccepted[]).map((insurance) => (
                <Badge
                  key={insurance}
                  variant={formData.insuranceAccepted.includes(insurance) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors px-3 py-1.5',
                    formData.insuranceAccepted.includes(insurance)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'border-cyan-300 text-cyan-700 hover:bg-cyan-50'
                  )}
                  onClick={() => toggleInsurance(insurance)}
                >
                  {INSURANCE_LABELS[insurance]}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bulkBilling"
                checked={formData.bulkBillingAvailable}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, bulkBillingAvailable: checked as boolean })
                }
              />
              <label
                htmlFor="bulkBilling"
                className="text-sm font-medium text-cyan-800 cursor-pointer"
              >
                Bulk billing available
              </label>
            </div>
          </div>

          {/* Services Description */}
          <div>
            <Label htmlFor="servicesDescription" className="text-cyan-800">
              Services Description
            </Label>
            <Textarea
              id="servicesDescription"
              value={formData.servicesDescription}
              onChange={(e) => setFormData({ ...formData, servicesDescription: e.target.value })}
              placeholder="Describe your services, treatment programs, and what clients can expect..."
              className="mt-1 bg-white border-cyan-200 min-h-[100px]"
              rows={4}
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 border-cyan-300 text-cyan-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
