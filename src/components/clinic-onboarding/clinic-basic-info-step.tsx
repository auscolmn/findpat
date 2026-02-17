'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { AUSTRALIAN_STATES } from '@/data/clinics';

interface ClinicBasicInfoData {
  name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  description: string;
}

interface ClinicBasicInfoStepProps {
  initialData?: Partial<ClinicBasicInfoData>;
  onSubmit: (data: ClinicBasicInfoData) => Promise<void>;
  isLoading?: boolean;
}

export function ClinicBasicInfoStep({ 
  initialData, 
  onSubmit,
  isLoading = false,
}: ClinicBasicInfoStepProps) {
  const [formData, setFormData] = useState<ClinicBasicInfoData>({
    name: initialData?.name || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    postcode: initialData?.postcode || '',
    description: initialData?.description || '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Clinic name is required');
      return;
    }

    if (!formData.city.trim() || !formData.state) {
      setError('Please provide your clinic location');
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
          <Building2 className="h-8 w-8 text-teal-600" />
        </div>
        <CardTitle className="text-2xl text-cyan-900">Clinic Details</CardTitle>
        <CardDescription className="text-cyan-600">
          Tell us about your treatment facility
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Clinic Name */}
          <div>
            <Label htmlFor="name" className="text-cyan-800">
              Clinic Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Psychedelic Medicine Institute"
              className="mt-1 bg-white border-cyan-200"
              required
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="text-cyan-800">
              Street Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g., 123 Collins Street, Level 15"
              className="mt-1 bg-white border-cyan-200"
            />
          </div>

          {/* City, State, Postcode */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="city" className="text-cyan-800">
                City *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., Melbourne"
                className="mt-1 bg-white border-cyan-200"
                required
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-cyan-800">
                State *
              </Label>
              <Select 
                value={formData.state} 
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger className="mt-1 bg-white border-cyan-200">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {AUSTRALIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="postcode" className="text-cyan-800">
                Postcode
              </Label>
              <Input
                id="postcode"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                placeholder="e.g., 3000"
                className="mt-1 bg-white border-cyan-200"
                maxLength={4}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-cyan-800">
              About Your Clinic
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell potential clients about your facility, your approach, and what makes you unique..."
              className="mt-1 bg-white border-cyan-200 min-h-[150px]"
              rows={6}
            />
            <p className="text-xs text-cyan-500 mt-1">
              You can add more detail later. This will appear on your clinic profile.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
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
        </form>
      </CardContent>
    </Card>
  );
}
