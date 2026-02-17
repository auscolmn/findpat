'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Shield, 
  ArrowLeft, 
  Loader2,
  CheckCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface ClinicVerificationData {
  abnNumber: string;
  skipVerification: boolean;
}

interface ClinicVerificationStepProps {
  initialData?: Partial<ClinicVerificationData>;
  onSubmit: (data: ClinicVerificationData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

export function ClinicVerificationStep({ 
  initialData, 
  onSubmit,
  onBack,
  isLoading = false,
}: ClinicVerificationStepProps) {
  const [formData, setFormData] = useState<ClinicVerificationData>({
    abnNumber: initialData?.abnNumber || '',
    skipVerification: initialData?.skipVerification || false,
  });
  const [error, setError] = useState<string | null>(null);

  // Format ABN as user types (XX XXX XXX XXX)
  const formatABN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length > 2) parts.push(digits.slice(2, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 8));
    if (digits.length > 8) parts.push(digits.slice(8, 11));
    return parts.join(' ');
  };

  const handleABNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatABN(e.target.value);
    setFormData({ ...formData, abnNumber: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const abnDigits = formData.abnNumber.replace(/\D/g, '');
    
    if (!formData.skipVerification && abnDigits.length !== 11) {
      setError('Please enter a valid 11-digit ABN');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSkip = async () => {
    try {
      await onSubmit({ ...formData, skipVerification: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Card className="shadow-neumorphic max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl text-cyan-900">Verification</CardTitle>
        <CardDescription className="text-cyan-600">
          Verify your business to build trust with clients
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Benefits of verification */}
          <div className="bg-cyan-50 rounded-lg p-4 space-y-2">
            <h3 className="font-medium text-cyan-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Why verify your clinic?
            </h3>
            <ul className="text-sm text-cyan-700 space-y-1 ml-6">
              <li>• Display a &quot;Verified&quot; badge on your profile</li>
              <li>• Appear higher in search results</li>
              <li>• Build trust with potential clients</li>
              <li>• Access to premium features</li>
            </ul>
          </div>

          {/* ABN Input */}
          <div>
            <Label htmlFor="abnNumber" className="text-cyan-800">
              Australian Business Number (ABN)
            </Label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <Input
                id="abnNumber"
                value={formData.abnNumber}
                onChange={handleABNChange}
                placeholder="XX XXX XXX XXX"
                className="pl-10 bg-white border-cyan-200 font-mono"
                maxLength={14}
              />
            </div>
            <p className="text-xs text-cyan-500 mt-1">
              We&apos;ll verify your ABN with the Australian Business Register
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              What happens next?
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              After submitting your ABN, we&apos;ll verify it against the Australian Business Register. 
              This usually takes 1-2 business days. Your profile will be listed immediately with a 
              &quot;Listed&quot; badge, which will upgrade to &quot;Verified&quot; once verification is complete.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || !formData.abnNumber}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Submit for Verification
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-cyan-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-cyan-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="w-full border-cyan-300 text-cyan-700"
              disabled={isLoading}
            >
              Skip for now (verify later)
            </Button>
          </div>

          {/* Back button */}
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="w-full text-cyan-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
