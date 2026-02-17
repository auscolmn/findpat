'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile, OnboardingStatus } from '@/types/database';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Loader2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Save,
} from 'lucide-react';

import { WelcomeStep } from '@/components/onboarding/welcome-step';
import { BasicInfoStep } from '@/components/onboarding/basic-info-step';
import { ProfessionalStep } from '@/components/onboarding/professional-step';
import { TrainingStep } from '@/components/onboarding/training-step';
import { SpecialtiesStep } from '@/components/onboarding/specialties-step';
import { BioStep } from '@/components/onboarding/bio-step';

const STEPS = [
  { id: 'welcome', label: 'Welcome', icon: CheckCircle, status: 'not_started' as OnboardingStatus },
  { id: 'basic_info', label: 'Basic Info', icon: User, status: 'basic_info' as OnboardingStatus },
  { id: 'professional', label: 'Professional', icon: Briefcase, status: 'professional' as OnboardingStatus },
  { id: 'training', label: 'Training', icon: GraduationCap, status: 'training' as OnboardingStatus },
  { id: 'specialties', label: 'Specialties', icon: Heart, status: 'specialties' as OnboardingStatus },
  { id: 'bio', label: 'Bio & Contact', icon: FileText, status: 'bio' as OnboardingStatus },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/register');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        
        // Resume from last step
        const stepIndex = STEPS.findIndex(s => s.status === profileData.onboarding_status);
        if (stepIndex > 0) {
          setCurrentStep(stepIndex);
        }
        
        // If already complete, go to dashboard
        if (profileData.onboarding_status === 'complete') {
          router.push('/dashboard');
          return;
        }
      } else {
        setProfile({ id: user.id, email: user.email });
      }

      setIsLoading(false);
    };

    loadProfile();
  }, [router]);

  const saveProgress = async (data: Partial<Profile>, nextStatus: OnboardingStatus) => {
    setIsSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      // Generate slug on final step
      let slug = profile?.slug;
      if (nextStatus === 'complete' && data.first_name && data.last_name) {
        const baseSlug = `${data.first_name}-${data.last_name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        slug = baseSlug;
      }

      const updateData = {
        ...data,
        onboarding_status: nextStatus,
        ...(slug && { slug }),
        ...(nextStatus === 'complete' && { is_published: true }),
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, ...updateData }));

      if (nextStatus === 'complete') {
        router.push('/dashboard?welcome=true');
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndExit = async () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50/50">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep 
            profile={profile} 
            onNext={() => setCurrentStep(1)} 
          />
        );
      case 1:
        return (
          <BasicInfoStep 
            profile={profile} 
            onSave={(data) => saveProgress(data, 'professional')}
            isSaving={isSaving}
          />
        );
      case 2:
        return (
          <ProfessionalStep 
            profile={profile} 
            onSave={(data) => saveProgress(data, 'training')}
            isSaving={isSaving}
          />
        );
      case 3:
        return (
          <TrainingStep 
            profile={profile} 
            onSave={(data) => saveProgress(data, 'specialties')}
            isSaving={isSaving}
          />
        );
      case 4:
        return (
          <SpecialtiesStep 
            profile={profile} 
            onSave={(data) => saveProgress(data, 'bio')}
            isSaving={isSaving}
          />
        );
      case 5:
        return (
          <BioStep 
            profile={profile} 
            onSave={(data) => saveProgress(data, 'complete')}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50/50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-cyan-900">Build Your Profile</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSaveAndExit}
              className="text-cyan-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Exit
            </Button>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive ? 'bg-cyan-600 text-white' : ''}
                      ${isComplete ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200' : ''}
                      ${!isActive && !isComplete ? 'bg-gray-100 text-gray-400' : ''}
                    `}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <ArrowRight className={`h-4 w-4 mx-1 ${isComplete ? 'text-green-500' : 'text-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* Step Content */}
        <Card className="shadow-neumorphic">
          <CardContent className="p-6 md:p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep > 0 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-cyan-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="text-sm text-cyan-500">
              Step {currentStep} of {STEPS.length - 1}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
