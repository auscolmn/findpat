'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, VerificationMethod } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X,
  Shield,
  FileText,
  Mail,
  Linkedin,
  Loader2,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Upload,
} from 'lucide-react';

interface VerificationModalProps {
  profile: Profile;
  onClose: () => void;
  onSuccess: () => void;
}

const VERIFICATION_METHODS: {
  id: VerificationMethod;
  title: string;
  description: string;
  icon: typeof Shield;
  recommended?: boolean;
}[] = [
  {
    id: 'ahpra',
    title: 'AHPRA Verification',
    description: 'Verify your registration against the AHPRA public register',
    icon: Shield,
    recommended: true,
  },
  {
    id: 'resume',
    title: 'Resume / CV Upload',
    description: 'Upload your professional resume for manual review',
    icon: FileText,
  },
  {
    id: 'professional_email',
    title: 'Professional Email',
    description: 'Verify using your workplace email domain',
    icon: Mail,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Profile',
    description: 'Link your LinkedIn for credential verification',
    icon: Linkedin,
  },
];

export function VerificationModal({ profile, onClose, onSuccess }: VerificationModalProps) {
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [ahpraNumber, setAhpraNumber] = useState(profile.ahpra_number || '');
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSelectMethod = (method: VerificationMethod) => {
    setSelectedMethod(method);
    setStep('form');
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedMethod) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      // Build verification record
      const verificationData: Record<string, unknown> = {
        profile_id: user.id,
        method: selectedMethod,
        status: 'pending',
      };

      switch (selectedMethod) {
        case 'ahpra':
          if (!ahpraNumber.trim()) throw new Error('AHPRA number is required');
          verificationData.ahpra_number = ahpraNumber.trim().toUpperCase();
          
          // Also update profile with AHPRA number
          await supabase
            .from('profiles')
            .update({ ahpra_number: ahpraNumber.trim().toUpperCase() })
            .eq('id', user.id);
          break;

        case 'professional_email':
          if (!professionalEmail.trim()) throw new Error('Professional email is required');
          if (!professionalEmail.includes('@')) throw new Error('Invalid email format');
          verificationData.professional_email = professionalEmail.trim();
          verificationData.professional_email_domain = professionalEmail.split('@')[1];
          break;

        case 'linkedin':
          if (!linkedinUrl.trim()) throw new Error('LinkedIn URL is required');
          if (!linkedinUrl.includes('linkedin.com')) throw new Error('Invalid LinkedIn URL');
          verificationData.linkedin_url = linkedinUrl.trim();
          break;

        case 'resume':
          if (!resumeFile) throw new Error('Please select a file to upload');
          
          // Upload file to storage
          const fileName = `${user.id}/${Date.now()}_${resumeFile.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, resumeFile);

          if (uploadError) throw uploadError;

          // Create document record
          await supabase.from('documents').insert({
            profile_id: user.id,
            file_name: resumeFile.name,
            file_type: resumeFile.type,
            file_size: resumeFile.size,
            storage_path: uploadData.path,
            document_type: 'resume',
          });
          break;
      }

      // Create verification request
      const { error: verifyError } = await supabase
        .from('verifications')
        .insert(verificationData);

      if (verifyError) throw verifyError;

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (selectedMethod) {
      case 'ahpra':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                <strong>Fast verification:</strong> We&apos;ll check your registration against the 
                public AHPRA register. Most verifications complete within 24 hours.
              </p>
            </div>

            <div>
              <Label htmlFor="ahpra" className="text-cyan-800">
                AHPRA Registration Number <span className="text-red-500">*</span>
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
        );

      case 'professional_email':
        return (
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-cyan-800">
                We&apos;ll send a verification email to confirm you work at this organization.
                Common domains: @hospital.com.au, @health.gov.au, @clinic.com.au
              </p>
            </div>

            <div>
              <Label htmlFor="proEmail" className="text-cyan-800">
                Professional Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="proEmail"
                type="email"
                placeholder="you@hospital.com.au"
                value={professionalEmail}
                onChange={(e) => setProfessionalEmail(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
              <p className="text-xs text-cyan-500 mt-1">
                Must be different from your personal email
              </p>
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                Link your LinkedIn profile so we can cross-reference your professional credentials.
              </p>
            </div>

            <div>
              <Label htmlFor="linkedin" className="text-cyan-800">
                LinkedIn Profile URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://www.linkedin.com/in/yourname"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-1 bg-white border-cyan-200"
              />
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-800">
                Upload your professional CV/resume. Our team will review it within 2-3 business days.
              </p>
            </div>

            <div>
              <Label className="text-cyan-800">
                Resume / CV <span className="text-red-500">*</span>
              </Label>
              <div className="mt-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-cyan-300 rounded-lg cursor-pointer hover:bg-cyan-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {resumeFile ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                        <p className="text-sm text-cyan-900 font-medium">{resumeFile.name}</p>
                        <p className="text-xs text-cyan-500">Click to change</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-cyan-400 mb-2" />
                        <p className="text-sm text-cyan-600">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-cyan-400">PDF, DOC, DOCX (max 10MB)</p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-cyan-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-cyan-900">
              {step === 'success' ? 'Verification Submitted!' : 'Get Verified'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 'select' && (
            <div className="space-y-4">
              <p className="text-cyan-600 mb-4">
                Choose a verification method to confirm your credentials:
              </p>

              {VERIFICATION_METHODS.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleSelectMethod(method.id)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-cyan-500 transition-all flex items-start gap-4"
                  >
                    <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-cyan-900">{method.title}</span>
                        {method.recommended && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-600">{method.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-cyan-400" />
                  </button>
                );
              })}
            </div>
          )}

          {step === 'form' && selectedMethod && (
            <div>
              <button
                onClick={() => setStep('select')}
                className="text-sm text-cyan-600 hover:text-cyan-800 mb-4 flex items-center gap-1"
              >
                ← Back to options
              </button>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
                  {error}
                </div>
              )}

              {renderForm()}

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit for Verification
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-cyan-900 mb-2">
                Verification Submitted!
              </h3>
              <p className="text-cyan-600 mb-6">
                We&apos;ll review your submission and update your profile once verified. 
                This usually takes 1-3 business days.
              </p>
              <Button onClick={onSuccess} className="bg-cyan-600 hover:bg-cyan-700">
                Return to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
