'use client';

import { useState } from 'react';
import { Profile } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  GraduationCap,
  Plus,
  Trash2,
  Loader2,
  ArrowRight,
} from 'lucide-react';

interface TrainingStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

interface CredentialInput {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
}

const COMMON_TRAININGS = [
  'MAPS MDMA Therapy Training',
  'Compass Psilocybin Therapy Training',
  'Ketamine-Assisted Psychotherapy Training',
  'Psychedelic-Assisted Therapy Certificate',
  'Integration Therapy Training',
  'Mind Medicine Australia Certificate',
];

export function TrainingStep({ profile, onSave, isSaving }: TrainingStepProps) {
  const [credentials, setCredentials] = useState<CredentialInput[]>([
    { id: '1', name: '', issuer: '', issuedAt: '' }
  ]);

  const addCredential = () => {
    setCredentials(prev => [...prev, { 
      id: Date.now().toString(), 
      name: '', 
      issuer: '', 
      issuedAt: '' 
    }]);
  };

  const removeCredential = (id: string) => {
    if (credentials.length > 1) {
      setCredentials(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCredential = (id: string, field: keyof CredentialInput, value: string) => {
    setCredentials(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const addCommonTraining = (name: string) => {
    const emptyCredential = credentials.find(c => !c.name.trim());
    if (emptyCredential) {
      updateCredential(emptyCredential.id, 'name', name);
    } else {
      setCredentials(prev => [...prev, { 
        id: Date.now().toString(), 
        name, 
        issuer: '', 
        issuedAt: '' 
      }]);
    }
  };

  const handleSubmit = () => {
    // Filter out empty credentials
    const validCredentials = credentials.filter(c => c.name.trim());
    
    // For now, we'll store credentials in a separate action after profile is saved
    // The profile update just marks training step as complete
    onSave({});
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Training & Credentials</h2>
          <p className="text-sm text-cyan-600">Your PAT-specific training and certifications</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Common Trainings Quick Add */}
        <div>
          <Label className="text-cyan-800">Quick Add Common Trainings</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {COMMON_TRAININGS.map((training) => (
              <button
                key={training}
                type="button"
                onClick={() => addCommonTraining(training)}
                className="px-3 py-1 text-sm rounded-full border border-cyan-300 text-cyan-700 hover:bg-cyan-50 transition-colors"
              >
                + {training}
              </button>
            ))}
          </div>
        </div>

        {/* Credential Entries */}
        <div className="space-y-4">
          <Label className="text-cyan-800">Your Trainings & Certifications</Label>
          
          {credentials.map((credential, index) => (
            <div 
              key={credential.id}
              className="p-4 border border-cyan-200 rounded-lg bg-white space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-cyan-700">
                  Training {index + 1}
                </span>
                {credentials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCredential(credential.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div>
                <Label htmlFor={`name-${credential.id}`} className="text-cyan-700 text-sm">
                  Training / Certificate Name
                </Label>
                <Input
                  id={`name-${credential.id}`}
                  placeholder="e.g., MAPS MDMA Therapy Training"
                  value={credential.name}
                  onChange={(e) => updateCredential(credential.id, 'name', e.target.value)}
                  className="mt-1 bg-white border-cyan-200"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`issuer-${credential.id}`} className="text-cyan-700 text-sm">
                    Issuing Organization
                  </Label>
                  <Input
                    id={`issuer-${credential.id}`}
                    placeholder="e.g., MAPS"
                    value={credential.issuer}
                    onChange={(e) => updateCredential(credential.id, 'issuer', e.target.value)}
                    className="mt-1 bg-white border-cyan-200"
                  />
                </div>
                <div>
                  <Label htmlFor={`date-${credential.id}`} className="text-cyan-700 text-sm">
                    Completion Date
                  </Label>
                  <Input
                    id={`date-${credential.id}`}
                    type="month"
                    value={credential.issuedAt}
                    onChange={(e) => updateCredential(credential.id, 'issuedAt', e.target.value)}
                    className="mt-1 bg-white border-cyan-200"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addCredential}
            className="w-full border-dashed border-cyan-300 text-cyan-600 hover:bg-cyan-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Training
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Tip:</strong> You can upload certificates later from your dashboard to get them verified.
          </p>
        </div>

        {/* Skip Option */}
        <p className="text-sm text-cyan-500 text-center">
          Don&apos;t have PAT-specific training yet? You can skip this and add it later.
        </p>

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
