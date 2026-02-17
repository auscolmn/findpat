'use client';

import { useState } from 'react';
import { Profile } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User,
  MapPin,
  Upload,
  Loader2,
  ArrowRight,
} from 'lucide-react';

interface BasicInfoStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

const AUSTRALIAN_STATES = [
  'ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'
];

export function BasicInfoStep({ profile, onSave, isSaving }: BasicInfoStepProps) {
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [city, setCity] = useState(profile?.city || '');
  const [state, setState] = useState(profile?.state || '');
  const [photoUrl, setPhotoUrl] = useState(profile?.photo_url || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      display_name: displayName.trim() || `${firstName.trim()} ${lastName.trim()}`,
      city: city.trim(),
      state,
      country: 'Australia',
      photo_url: photoUrl || null,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <User className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Basic Information</h2>
          <p className="text-sm text-cyan-600">Tell us about yourself</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Photo Upload */}
        <div>
          <Label className="text-cyan-800">Profile Photo</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-cyan-400" />
              )}
            </div>
            <div>
              <Button variant="outline" size="sm" className="border-cyan-300" disabled>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-xs text-cyan-500 mt-1">JPG, PNG up to 2MB (coming soon)</p>
            </div>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-cyan-800">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="Jane"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`mt-1 bg-white ${errors.firstName ? 'border-red-400' : 'border-cyan-200'}`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-cyan-800">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`mt-1 bg-white ${errors.lastName ? 'border-red-400' : 'border-cyan-200'}`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Display Name */}
        <div>
          <Label htmlFor="displayName" className="text-cyan-800">
            Display Name <span className="text-cyan-400">(optional)</span>
          </Label>
          <Input
            id="displayName"
            placeholder="Dr. Jane Smith"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 bg-white border-cyan-200"
          />
          <p className="text-xs text-cyan-500 mt-1">
            How you&apos;d like to be displayed. Leave blank to use your full name.
          </p>
        </div>

        {/* Location */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">Location</span>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-cyan-800">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Melbourne"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`mt-1 bg-white ${errors.city ? 'border-red-400' : 'border-cyan-200'}`}
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state" className="text-cyan-800">
                State <span className="text-red-500">*</span>
              </Label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`mt-1 w-full h-10 px-3 rounded-md border bg-white ${errors.state ? 'border-red-400' : 'border-cyan-200'}`}
              >
                <option value="">Select state...</option>
                {AUSTRALIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-xs text-red-500 mt-1">{errors.state}</p>
              )}
            </div>
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
