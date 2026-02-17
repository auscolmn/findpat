'use client';

import { useState } from 'react';
import { Profile, AvailabilityStatusDB } from '@/types/database';
import { ROLE_LABELS } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText,
  Globe,
  Phone,
  Languages,
  Users,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface BioStepProps {
  profile: Partial<Profile> | null;
  onSave: (data: Partial<Profile>) => void;
  isSaving: boolean;
}

const AVAILABILITY_OPTIONS: { value: AvailabilityStatusDB; label: string; description: string }[] = [
  { value: 'accepting', label: 'Accepting New Clients', description: 'Currently taking on new patients' },
  { value: 'waitlist', label: 'Waitlist Only', description: 'Accepting waitlist registrations' },
  { value: 'not_accepting', label: 'Not Accepting', description: 'Not taking new clients at this time' },
];

const COMMON_LANGUAGES = ['English', 'Mandarin', 'Vietnamese', 'Greek', 'Italian', 'Arabic', 'Spanish', 'Hindi', 'Punjabi'];

export function BioStep({ profile, onSave, isSaving }: BioStepProps) {
  const [bio, setBio] = useState(profile?.bio || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [bookingUrl, setBookingUrl] = useState(profile?.booking_url || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [acceptsDirectContact, setAcceptsDirectContact] = useState(profile?.accepts_direct_contact ?? true);
  const [languages, setLanguages] = useState<string[]>(profile?.languages || ['English']);
  const [availability, setAvailability] = useState<AvailabilityStatusDB>(profile?.availability || 'not_accepting');
  const [lookingToCollaborate, setLookingToCollaborate] = useState(profile?.looking_to_collaborate ?? false);
  const [collaborationRoles, setCollaborationRoles] = useState<string[]>(profile?.collaboration_roles || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const toggleCollaborationRole = (role: string) => {
    setCollaborationRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bio.trim() || bio.trim().length < 50) {
      newErrors.bio = 'Please write at least 50 characters about yourself';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      bio: bio.trim(),
      website: website.trim() || null,
      booking_url: bookingUrl.trim() || null,
      phone: phone.trim() || null,
      accepts_direct_contact: acceptsDirectContact,
      languages,
      availability,
      looking_to_collaborate: lookingToCollaborate,
      collaboration_roles: lookingToCollaborate ? collaborationRoles : [],
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-900">Bio & Contact</h2>
          <p className="text-sm text-cyan-600">Final step! Tell people about yourself</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="text-cyan-800">
            Professional Bio <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="bio"
            rows={5}
            placeholder="Tell potential clients about your background, approach, and what makes you unique..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`mt-1 w-full p-3 rounded-md border bg-white resize-none ${
              errors.bio ? 'border-red-400' : 'border-cyan-200'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.bio && (
              <p className="text-xs text-red-500">{errors.bio}</p>
            )}
            <p className={`text-xs ml-auto ${bio.length >= 50 ? 'text-green-500' : 'text-cyan-500'}`}>
              {bio.length} / 50 min characters
            </p>
          </div>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-cyan-800">Client Availability</Label>
          <div className="mt-2 grid gap-2">
            {AVAILABILITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAvailability(option.value)}
                className={`
                  w-full text-left p-3 rounded-lg border-2 transition-all
                  ${availability === option.value 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'}
                `}
              >
                <div className="font-medium text-cyan-900">{option.label}</div>
                <div className="text-xs text-cyan-600">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">Contact & Links</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="website" className="text-cyan-800">
                Personal Website <span className="text-cyan-400">(optional)</span>
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
            </div>
            <div>
              <Label htmlFor="booking" className="text-cyan-800">
                Booking URL <span className="text-cyan-400">(optional)</span>
              </Label>
              <Input
                id="booking"
                type="url"
                placeholder="https://calendly.com/yourname"
                value={bookingUrl}
                onChange={(e) => setBookingUrl(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-cyan-800">
                Phone <span className="text-cyan-400">(optional)</span>
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="04XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border-cyan-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="directContact"
                checked={acceptsDirectContact}
                onChange={(e) => setAcceptsDirectContact(e.target.checked)}
                className="h-4 w-4 rounded border-cyan-300 text-cyan-600"
              />
              <Label htmlFor="directContact" className="text-cyan-700 text-sm cursor-pointer">
                Allow clients to contact me directly via email
              </Label>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">Languages Spoken</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {COMMON_LANGUAGES.map((lang) => {
              const isSelected = languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`
                    px-3 py-1 rounded-full text-sm transition-all
                    ${isSelected 
                      ? 'bg-cyan-600 text-white' 
                      : 'border border-cyan-300 text-cyan-700 hover:bg-cyan-50'}
                  `}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collaboration */}
        <div className="pt-4 border-t border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-cyan-900">Collaboration</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="collaborate"
              checked={lookingToCollaborate}
              onChange={(e) => setLookingToCollaborate(e.target.checked)}
              className="h-4 w-4 rounded border-cyan-300 text-cyan-600"
            />
            <Label htmlFor="collaborate" className="text-cyan-700 cursor-pointer">
              I&apos;m looking to collaborate with other practitioners
            </Label>
          </div>

          {lookingToCollaborate && (
            <div className="ml-7">
              <p className="text-sm text-cyan-600 mb-2">I&apos;m looking for:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(ROLE_LABELS).map(([value, label]) => {
                  const isSelected = collaborationRoles.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleCollaborationRole(value)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all
                        ${isSelected 
                          ? 'bg-green-600 text-white' 
                          : 'border border-green-300 text-green-700 hover:bg-green-50'}
                      `}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing Profile...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Complete & Publish Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
