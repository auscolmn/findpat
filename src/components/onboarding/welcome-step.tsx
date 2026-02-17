'use client';

import { Profile } from '@/types/database';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Clock, 
  Shield, 
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface WelcomeStepProps {
  profile: Partial<Profile> | null;
  onNext: () => void;
}

export function WelcomeStep({ profile, onNext }: WelcomeStepProps) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center mx-auto mb-6">
        <Sparkles className="h-10 w-10 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-cyan-900 mb-4">
        Welcome to FindPAT!
      </h2>

      <p className="text-lg text-cyan-700 mb-8">
        Let&apos;s build your practitioner profile. This should take about 5-10 minutes.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-xl bg-cyan-50">
          <Clock className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-cyan-900">5-10 min</p>
          <p className="text-xs text-cyan-600">to complete</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50">
          <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-cyan-900">Get Verified</p>
          <p className="text-xs text-cyan-600">build trust</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-50">
          <CheckCircle className="h-6 w-6 text-amber-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-cyan-900">Save & Resume</p>
          <p className="text-xs text-cyan-600">anytime</p>
        </div>
      </div>

      <div className="bg-cyan-50 rounded-xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-cyan-900 mb-3">What we&apos;ll collect:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-cyan-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Basic info (name, photo, location)</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-cyan-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Professional details (role, workplace, AHPRA)</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-cyan-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Training & credentials</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-cyan-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Specialties & modalities</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-cyan-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Bio & contact preferences</span>
          </li>
        </ul>
      </div>

      <Button
        size="lg"
        onClick={onNext}
        className="bg-green-600 hover:bg-green-700 text-lg px-8"
      >
        Let&apos;s Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
