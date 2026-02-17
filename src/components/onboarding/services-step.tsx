'use client';

import { useState } from 'react';
import { Profile, ServiceTypeDB, CoverageTypeDB } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Zap,
  Sprout,
  Loader2,
  ArrowRight,
  Heart,
  Shield,
  Building2,
} from 'lucide-react';

interface ServicesStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

const SERVICE_OPTIONS: { value: ServiceTypeDB; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    value: 'dosing',
    label: 'Dosing Sessions',
    description: 'I conduct psychedelic-assisted therapy dosing sessions',
    icon: Zap,
  },
  {
    value: 'integration',
    label: 'Integration Therapy',
    description: 'I provide preparation and post-session integration support',
    icon: Sprout,
  },
];

const COVERAGE_OPTIONS: { value: CoverageTypeDB; label: string; description: string; emoji: string }[] = [
  {
    value: 'medicare',
    label: 'Medicare',
    description: 'Patients can claim through Medicare rebates',
    emoji: '💚',
  },
  {
    value: 'dva',
    label: 'DVA',
    description: 'Accept Department of Veterans\' Affairs funding',
    emoji: '🏥',
  },
  {
    value: 'phi',
    label: 'Private Health Insurance',
    description: 'Accept private health insurance claims',
    emoji: '🛡️',
  },
];

export function ServicesStep({ profile, onSave, isSaving }: ServicesStepProps) {
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeDB[]>(profile?.service_types || []);
  const [coverage, setCoverage] = useState<CoverageTypeDB[]>(profile?.coverage || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleServiceType = (serviceType: ServiceTypeDB) => {
    setServiceTypes((prev) =>
      prev.includes(serviceType)
        ? prev.filter((s) => s !== serviceType)
        : [...prev, serviceType]
    );
  };

  const toggleCoverage = (cov: CoverageTypeDB) => {
    setCoverage((prev) =>
      prev.includes(cov) ? prev.filter((c) => c !== cov) : [...prev, cov]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (serviceTypes.length === 0) {
      newErrors.serviceTypes = 'Please select at least one service type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      service_types: serviceTypes,
      coverage: coverage,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <Heart className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Services You Offer</h2>
          <p className="text-sm text-cyan-600">What services do you provide to clients?</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Service Types */}
        <div>
          <Label className="text-cyan-800 text-base font-semibold">
            Service Types <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-cyan-600 mt-1 mb-4">
            Select all that apply to your practice
          </p>
          <div className="grid gap-3">
            {SERVICE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = serviceTypes.includes(option.value);
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleServiceType(option.value)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-4
                    ${isSelected 
                      ? 'border-cyan-600 bg-cyan-50' 
                      : 'border-gray-200 hover:border-cyan-300'}
                  `}
                >
                  <div className={`
                    h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-cyan-900">{option.label}</div>
                    <div className="text-sm text-cyan-600">{option.description}</div>
                  </div>
                  <div className={`
                    h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-2
                    ${isSelected ? 'border-cyan-600 bg-cyan-600' : 'border-gray-300'}
                  `}>
                    {isSelected && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.serviceTypes && (
            <p className="text-xs text-red-500 mt-2">{errors.serviceTypes}</p>
          )}
        </div>

        {/* Coverage */}
        <div className="pt-6 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-cyan-600" />
            <Label className="text-cyan-800 text-base font-semibold">
              Coverage Accepted
            </Label>
            <span className="text-cyan-400 text-sm">(optional)</span>
          </div>
          <p className="text-sm text-cyan-600 mb-4">
            Help clients find practitioners that accept their coverage
          </p>
          <div className="grid gap-3">
            {COVERAGE_OPTIONS.map((option) => {
              const isSelected = coverage.includes(option.value);
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleCoverage(option.value)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-4
                    ${isSelected 
                      ? option.value === 'medicare'
                        ? 'border-green-500 bg-green-50'
                        : option.value === 'dva'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-cyan-300'}
                  `}
                >
                  <div className="text-2xl flex-shrink-0">{option.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-cyan-900">{option.label}</div>
                    <div className="text-sm text-cyan-600">{option.description}</div>
                  </div>
                  <div className={`
                    h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-2
                    ${isSelected 
                      ? option.value === 'medicare'
                        ? 'border-green-500 bg-green-500'
                        : option.value === 'dva'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'}
                  `}>
                    {isSelected && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {isSaving ? (
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
      </div>
    </div>
  );
}
