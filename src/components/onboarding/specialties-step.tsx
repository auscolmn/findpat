'use client';

import { useState } from 'react';
import { Profile } from '@/types/database';
import { MODALITY_LABELS, SPECIALTY_LABELS } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Heart,
  Loader2,
  ArrowRight,
  Check,
} from 'lucide-react';

interface SpecialtiesStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

const MODALITIES = Object.entries(MODALITY_LABELS).map(([value, label]) => ({ value, label }));
const SPECIALTIES = Object.entries(SPECIALTY_LABELS).map(([value, label]) => ({ value, label }));

export function SpecialtiesStep({ profile, onSave, isSaving }: SpecialtiesStepProps) {
  const [modalities, setModalities] = useState<string[]>(profile?.modalities || []);
  const [specialties, setSpecialties] = useState<string[]>(profile?.specialties || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleModality = (value: string) => {
    setModalities(prev => 
      prev.includes(value) 
        ? prev.filter(m => m !== value)
        : [...prev, value]
    );
  };

  const toggleSpecialty = (value: string) => {
    setSpecialties(prev => 
      prev.includes(value) 
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (modalities.length === 0) {
      newErrors.modalities = 'Please select at least one modality';
    }
    if (specialties.length === 0) {
      newErrors.specialties = 'Please select at least one specialty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      modalities,
      specialties,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <Heart className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Specialties & Modalities</h2>
          <p className="text-sm text-cyan-600">What do you work with?</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Modalities */}
        <div>
          <h3 className="font-semibold text-cyan-900 mb-2">
            Psychedelic Modalities <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-cyan-600 mb-4">
            Which substances do you work with in your practice?
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {MODALITIES.map(({ value, label }) => {
              const isSelected = modalities.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleModality(value)}
                  className={`
                    relative p-3 rounded-lg border-2 text-sm font-medium transition-all
                    ${isSelected 
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-900' 
                      : 'border-gray-200 hover:border-cyan-300 text-gray-700'}
                  `}
                >
                  {isSelected && (
                    <Check className="absolute top-1 right-1 h-4 w-4 text-cyan-600" />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
          {errors.modalities && (
            <p className="text-xs text-red-500 mt-2">{errors.modalities}</p>
          )}
        </div>

        {/* Specialties */}
        <div>
          <h3 className="font-semibold text-cyan-900 mb-2">
            Clinical Specialties <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-cyan-600 mb-4">
            What conditions or areas do you specialize in?
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SPECIALTIES.map(({ value, label }) => {
              const isSelected = specialties.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleSpecialty(value)}
                  className={`
                    relative p-3 rounded-lg border-2 text-sm font-medium transition-all text-left
                    ${isSelected 
                      ? 'border-green-500 bg-green-50 text-green-900' 
                      : 'border-gray-200 hover:border-green-300 text-gray-700'}
                  `}
                >
                  {isSelected && (
                    <Check className="absolute top-1 right-1 h-4 w-4 text-green-600" />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
          {errors.specialties && (
            <p className="text-xs text-red-500 mt-2">{errors.specialties}</p>
          )}
        </div>

        {/* Selected Summary */}
        {(modalities.length > 0 || specialties.length > 0) && (
          <div className="bg-cyan-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-cyan-900 mb-2">Your Selections:</h4>
            <div className="flex flex-wrap gap-2">
              {modalities.map(m => (
                <span key={m} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">
                  {MODALITY_LABELS[m as keyof typeof MODALITY_LABELS]}
                </span>
              ))}
              {specialties.map(s => (
                <span key={s} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {SPECIALTY_LABELS[s as keyof typeof SPECIALTY_LABELS]}
                </span>
              ))}
            </div>
          </div>
        )}

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
