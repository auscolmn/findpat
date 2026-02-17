'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Clock,
  ArrowRight, 
  ArrowLeft, 
  Loader2 
} from 'lucide-react';

interface OperatingHours {
  monday?: { open: string; close: string };
  tuesday?: { open: string; close: string };
  wednesday?: { open: string; close: string };
  thursday?: { open: string; close: string };
  friday?: { open: string; close: string };
  saturday?: { open: string; close: string };
  sunday?: { open: string; close: string };
}

interface ClinicContactData {
  phone: string;
  email: string;
  website: string;
  bookingUrl: string;
  operatingHours: OperatingHours;
}

interface ClinicContactStepProps {
  initialData?: Partial<ClinicContactData>;
  onSubmit: (data: ClinicContactData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const DAY_LABELS: Record<typeof DAYS[number], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function ClinicContactStep({ 
  initialData, 
  onSubmit,
  onBack,
  isLoading = false,
}: ClinicContactStepProps) {
  const [formData, setFormData] = useState<ClinicContactData>({
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    website: initialData?.website || '',
    bookingUrl: initialData?.bookingUrl || '',
    operatingHours: initialData?.operatingHours || {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
    },
  });
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: typeof DAYS[number]) => {
    setFormData((prev) => {
      const newHours = { ...prev.operatingHours };
      if (newHours[day]) {
        delete newHours[day];
      } else {
        newHours[day] = { open: '09:00', close: '17:00' };
      }
      return { ...prev, operatingHours: newHours };
    });
  };

  const updateHours = (day: typeof DAYS[number], field: 'open' | 'close', value: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.phone && !formData.email) {
      setError('Please provide at least one contact method (phone or email)');
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
          <Phone className="h-8 w-8 text-teal-600" />
        </div>
        <CardTitle className="text-2xl text-cyan-900">Contact & Hours</CardTitle>
        <CardDescription className="text-cyan-600">
          How can clients reach you?
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Contact Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-cyan-800">
                Phone Number
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(03) 9000 1234"
                  className="pl-10 bg-white border-cyan-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-cyan-800">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@clinic.com.au"
                  className="pl-10 bg-white border-cyan-200"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="text-cyan-800">
                Website
              </Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com.au"
                  className="pl-10 bg-white border-cyan-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bookingUrl" className="text-cyan-800">
                Online Booking URL
              </Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="bookingUrl"
                  type="url"
                  value={formData.bookingUrl}
                  onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
                  placeholder="https://booking.yourwebsite.com.au"
                  className="pl-10 bg-white border-cyan-200"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <Label className="text-cyan-800 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Operating Hours
            </Label>
            <div className="space-y-2">
              {DAYS.map((day) => {
                const isOpen = !!formData.operatingHours[day];
                return (
                  <div key={day} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`w-24 text-left text-sm font-medium px-2 py-1 rounded ${
                        isOpen 
                          ? 'text-cyan-900 bg-cyan-100' 
                          : 'text-cyan-400 bg-gray-50'
                      }`}
                    >
                      {DAY_LABELS[day]}
                    </button>
                    
                    {isOpen ? (
                      <>
                        <Input
                          type="time"
                          value={formData.operatingHours[day]?.open || '09:00'}
                          onChange={(e) => updateHours(day, 'open', e.target.value)}
                          className="w-28 bg-white border-cyan-200 text-sm"
                        />
                        <span className="text-cyan-500">to</span>
                        <Input
                          type="time"
                          value={formData.operatingHours[day]?.close || '17:00'}
                          onChange={(e) => updateHours(day, 'close', e.target.value)}
                          className="w-28 bg-white border-cyan-200 text-sm"
                        />
                      </>
                    ) : (
                      <span className="text-cyan-400 text-sm">Closed</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-cyan-500 mt-2">
              Click on a day to toggle open/closed
            </p>
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
