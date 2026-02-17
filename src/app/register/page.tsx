'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2,
  CheckCircle,
  Shield,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Create initial profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            onboarding_status: 'not_started',
          });

        if (profileError && profileError.code !== '23505') {
          console.error('Profile creation error:', profileError);
        }

        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-cyan-50/50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="max-w-md w-full shadow-neumorphic">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-cyan-600 mb-6">
                We&apos;ve sent a confirmation link to <strong>{email}</strong>. 
                Click the link to verify your email and start building your profile.
              </p>
              <p className="text-sm text-cyan-500">
                Didn&apos;t receive it? Check your spam folder or{' '}
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-cyan-700 underline hover:text-cyan-900"
                >
                  try again
                </button>
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left: Benefits */}
            <div className="hidden lg:block">
              <h1 className="text-3xl md:text-4xl font-bold text-cyan-900 mb-6">
                Join Australia&apos;s Premier PAT Directory
              </h1>
              <p className="text-lg text-cyan-700 mb-8">
                Create your practitioner profile and connect with clients seeking 
                psychedelic-assisted therapy.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-1">Get Discovered</h3>
                    <p className="text-cyan-600 text-sm">
                      Be found by clients actively searching for PAT practitioners in their area.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-1">Build Trust</h3>
                    <p className="text-cyan-600 text-sm">
                      Verify your credentials and display badges that show your qualifications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-1">Find Collaborators</h3>
                    <p className="text-cyan-600 text-sm">
                      Connect with other practitioners to build your interdisciplinary team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-white rounded-xl shadow-raised">
                <p className="text-cyan-700 italic">
                  &quot;FindPAT helped me connect with the right psychiatrist to complete 
                  my PAT team. Within weeks, we were seeing patients together.&quot;
                </p>
                <p className="text-cyan-900 font-semibold mt-3">
                  — Dr. Sarah Mitchell, Clinical Psychologist
                </p>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div>
              <Card className="shadow-neumorphic">
                <CardHeader className="text-center pb-4">
                  <h2 className="text-2xl font-bold text-cyan-900">
                    Create Your Account
                  </h2>
                  <p className="text-cyan-600 text-sm mt-1">
                    Free to start • Upgrade anytime
                  </p>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  {/* Google Sign Up */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 mb-4"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-cyan-500">
                      or
                    </span>
                  </div>

                  {/* Email Sign Up Form */}
                  <form onSubmit={handleEmailSignup} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="email" className="text-cyan-800">
                        Email
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white border-cyan-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-cyan-800">
                        Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Min. 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 bg-white border-cyan-200"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-cyan-800">
                        Confirm Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 bg-white border-cyan-200"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-cyan-500 text-center mt-6">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-cyan-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline hover:text-cyan-700">
                      Privacy Policy
                    </Link>
                  </p>

                  <Separator className="my-6" />

                  <p className="text-center text-cyan-700">
                    Already have an account?{' '}
                    <Link href="/login" className="text-cyan-600 font-semibold hover:text-cyan-800">
                      Sign in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
