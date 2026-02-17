'use client';

import { useState } from 'react';
import { Profile, PractitionerRoleDB } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Briefcase,
  Building2,
  Shield,
  Loader2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface ProfessionalStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

const ROLE_OPTIONS: { value: PractitionerRoleDB; label: string; description: string }[] = [
  { value: 'psychiatrist', label: 'Psychiatrist', description: 'Medical doctor specializing in mental health' },
  { value: 'psychologist', label: 'Psychologist', description: 'Licensed clinical or counseling psychologist' },
  { value: 'therapist', label: 'Therapist / Counselor', description: 'Licensed therapist or counselor' },
  { value: 'nurse', label: 'Nurse Practitioner', description: 'Psychiatric or mental health nurse' },
  { value: 'integration_coach', label: 'Integration Coach', description: 'Specializes in psychedelic integration' },
];

export function ProfessionalStep({ profile, onSave, isSaving }: ProfessionalStepProps) {
  const [role, setRole] = useState<PractitionerRoleDB | null>(profile?.role || null);
  const [licenseType, setLicenseType] = useState(profile?.license_type || '');
  const [workplace, setWorkplace] = useState(profile?.workplace || '');
  const [workplaceWebsite, setWorkplaceWebsite] = useState(profile?.workplace_website || '');
  const [ahpraNumber, setAhpraNumber] = useState(profile?.ahpra_number || '');
  const [yearsExperience, setYearsExperience] = useState(profile?.years_experience?.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!role) newErrors.role = 'Please select your role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      role,
      license_type: licenseType.trim() || null,
      workplace: workplace.trim() || null,
      workplace_website: workplaceWebsite.trim() || null,
      ahpra_number: ahpraNumber.trim() || null,
      years_experience: yearsExperience ? parseInt(yearsExperience, 10) : null,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Professional Details</h2>
          <p className="text-sm text-cyan-600">Your role and credentials</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Role Selection */}
        <div>
          <Label className="text-cyan-800">
            Professional Role <span className="text-red-500">*</span>
          </Label>
          <div className="mt-3 grid gap-3">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${role === option.value 
                    ? 'border-cyan-600 bg-cyan-50' 
                    : 'border-gray-200 hover:border-cyan-300'}
                `}
              >
                <div className="font-medium text-cyan-900">{option.label}</div>
                <div className="text-sm text-cyan-600">{option.description}</div>
              </button>
            ))}
          </div>
          {errors.role && (
            <p className="text-xs text-red-500 mt-2">{errors.role}</p>
          )}
        </div>

        {/* License Type */}
        <div>
          <Label htmlFor="licenseType" className="text-cyan-800">
            License Type <span className="text-cyan-400">(optional)</span>
          </Label>
          <Input
            id="licenseType"
            placeholder="e.g., Clinical Psychologist, Psychiatrist"
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
            className="mt-1 bg-white border-cyan-200"
          />
        </div>

        {/* Workplace */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">Workplace</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="workplace" className="text-cyan-800">
                Practice / Clinic Name <span className="text-cyan-400">(optional)</span>
              </Label>
              <Input
                id="workplace"
                placeholder="e.g., Melbourne Mind Clinic"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
            </div>
            <div>
              <Label htmlFor="workplaceWebsite" className="text-cyan-800">
                Workplace Website <span className="text-cyan-400">(optional)</span>
              </Label>
              <Input
                id="workplaceWebsite"
                type="url"
                placeholder="https://www.clinic.com.au"
                value={workplaceWebsite}
                onChange={(e) => setWorkplaceWebsite(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
            </div>
          </div>
        </div>

        {/* AHPRA */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">AHPRA Registration</span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800">
              <strong>Verification bonus:</strong> Adding your AHPRA number helps verify your credentials 
              and earns a Verified badge.
            </p>
          </div>

          <div>
            <Label htmlFor="ahpra" className="text-cyan-800">
              AHPRA Registration Number <span className="text-cyan-400">(optional)</span>
            </Label>
            <Input
              id="ahpra"
              placeholder="e.g., PSY0001234567"
              value={ahpraNumber}
              onChange={(e) => setAhpraNumber(e.target.value.toUpperCase())}
              className="mt-1 bg-white border-cyan-200"
            />
            <p className="text-xs text-cyan-500 mt-1 flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <a 
                href="https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cyan-700"
              >
                Look up on AHPRA Register
              </a>
            </p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <Label htmlFor="years" className="text-cyan-800">
            Years of Experience <span className="text-cyan-400">(optional)</span>
          </Label>
          <Input
            id="years"
            type="number"
            min="0"
            max="50"
            placeholder="e.g., 10"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            className="mt-1 bg-white border-cyan-200 w-32"
          />
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
