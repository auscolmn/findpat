'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import {
  ClinicBasicInfoStep,
  ClinicServicesStep,
  ClinicContactStep,
  ClinicVerificationStep,
} from '@/components/clinic-onboarding';
import { cn } from '@/lib/utils';
import { Loader2, Building2, Stethoscope, Phone, Shield, CheckCircle } from 'lucide-react';

type OnboardingStep = 'basic_info' | 'services' | 'contact' | 'verification' | 'complete';

const STEPS: { key: OnboardingStep; label: string; icon: React.ElementType }[] = [
  { key: 'basic_info', label: 'Clinic Details', icon: Building2 },
  { key: 'services', label: 'Services', icon: Stethoscope },
  { key: 'contact', label: 'Contact & Hours', icon: Phone },
  { key: 'verification', label: 'Verification', icon: Shield },
];

export default function ClinicOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('basic_info');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [clinicData, setClinicData] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // In a real app, we'd check if they already have a clinic and load its data
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleBasicInfoSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // In a real app, save to database
      setClinicData({ ...clinicData, ...data });
      setCurrentStep('services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServicesSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      setClinicData({ ...clinicData, ...data });
      setCurrentStep('contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      setClinicData({ ...clinicData, ...data });
      setCurrentStep('verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const finalData = { ...clinicData, ...data };
      
      // In a real app, we would save all the clinic data to Supabase
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Create slug from clinic name
        const slug = finalData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        // This would be the actual database insert
        // await supabase.from('clinics').insert({
        //   owner_id: user.id,
        //   slug,
        //   name: finalData.name,
        //   ...etc
        // });
      }

      setCurrentStep('complete');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen flex flex-col bg-cyan-50/50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-cyan-900 mb-4">
              Your Clinic is Listed!
            </h1>
            <p className="text-cyan-600 mb-6">
              {clinicData.abnNumber && !clinicData.skipVerification
                ? "We're verifying your ABN. Once verified, your profile will display a 'Verified' badge. In the meantime, your clinic is live and searchable!"
                : "Your clinic profile is now live on FindPAT. You can verify your business later to display a 'Verified' badge."
              }
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push('/clinics')}
                className="w-full border border-cyan-300 text-cyan-700 hover:bg-cyan-50 py-3 px-4 rounded-lg font-medium"
              >
                View Your Listing
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex(s => s.key === currentStep);

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.key === currentStep;
                const isCompleted = index < currentStepIndex;

                return (
                  <div key={step.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center transition-colors',
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-xs mt-2 text-center hidden sm:block',
                          isActive ? 'text-teal-700 font-medium' : 'text-gray-500'
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                    
                    {index < STEPS.length - 1 && (
                      <div
                        className={cn(
                          'w-12 sm:w-20 h-1 mx-2',
                          index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 'basic_info' && (
            <ClinicBasicInfoStep
              initialData={clinicData}
              onSubmit={handleBasicInfoSubmit}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'services' && (
            <ClinicServicesStep
              initialData={clinicData}
              onSubmit={handleServicesSubmit}
              onBack={() => setCurrentStep('basic_info')}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'contact' && (
            <ClinicContactStep
              initialData={clinicData}
              onSubmit={handleContactSubmit}
              onBack={() => setCurrentStep('services')}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'verification' && (
            <ClinicVerificationStep
              initialData={clinicData}
              onSubmit={handleVerificationSubmit}
              onBack={() => setCurrentStep('contact')}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
