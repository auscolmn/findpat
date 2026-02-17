'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile, Verification } from '@/types/database';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VerificationBadge } from '@/components/verification-badge';
import { VerificationModal } from '@/components/dashboard/verification-modal';
import { 
  Loader2, 
  Eye, 
  Edit, 
  ExternalLink,
  Shield,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Calendar,
  Sparkles,
  X,
} from 'lucide-react';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';
  
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [showWelcome, setShowWelcome] = useState(isWelcome);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profileData) {
        router.push('/onboarding');
        return;
      }

      // Redirect to onboarding if not complete
      if (profileData.onboarding_status !== 'complete') {
        router.push('/onboarding');
        return;
      }

      setProfile(profileData);

      // Fetch verifications
      const { data: verificationsData } = await supabase
        .from('verifications')
        .select('*')
        .eq('profile_id', user.id)
        .order('submitted_at', { ascending: false });

      setVerifications(verificationsData || []);
      setIsLoading(false);
    };

    loadData();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50/50">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!profile) return null;

  const pendingVerifications = verifications.filter(v => v.status === 'pending' || v.status === 'under_review');
  const hasAhpra = profile.ahpra_number && profile.ahpra_number.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Modal */}
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="max-w-md w-full shadow-xl animate-in fade-in zoom-in">
              <CardContent className="p-6 text-center">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-cyan-900 mb-2">
                  Your Profile is Live! 🎉
                </h2>
                <p className="text-cyan-600 mb-6">
                  Congratulations! Your practitioner profile is now visible to clients 
                  searching for PAT practitioners.
                </p>

                <div className="flex gap-3 justify-center">
                  <Link href={`/practitioner/${profile.slug}`}>
                    <Button variant="outline" className="border-cyan-600 text-cyan-700">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      setShowWelcome(false);
                      setShowVerificationModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Get Verified
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-900">
              Welcome back, {profile.first_name}!
            </h1>
            <p className="text-cyan-600">Manage your practitioner profile</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/practitioner/${profile.slug}`}>
              <Button variant="outline" className="border-cyan-600 text-cyan-700">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="outline" className="border-cyan-600 text-cyan-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Profile Views */}
          <Card className="shadow-neumorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">Profile Views</p>
                  <p className="text-2xl font-bold text-cyan-900">{profile.profile_views}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="shadow-neumorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">Status</p>
                  <div className="mt-1">
                    <VerificationBadge tier={profile.verification_tier} />
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="shadow-neumorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">Availability</p>
                  <p className="text-lg font-semibold text-cyan-900 capitalize">
                    {profile.availability.replace('_', ' ')}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Member Since */}
          <Card className="shadow-neumorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">Member Since</p>
                  <p className="text-lg font-semibold text-cyan-900">
                    {new Date(profile.created_at).toLocaleDateString('en-AU', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verification CTA */}
            {profile.verification_tier === 'listed' && (
              <Card className="shadow-neumorphic border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-cyan-900 mb-1">
                        Get Verified — Stand Out From the Crowd
                      </h3>
                      <p className="text-sm text-cyan-600 mb-4">
                        Verified practitioners get 3x more profile views. Verify your credentials 
                        to build trust with potential clients.
                      </p>
                      <Button 
                        onClick={() => setShowVerificationModal(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Start Verification
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pending Verifications */}
            {pendingVerifications.length > 0 && (
              <Card className="shadow-neumorphic">
                <CardHeader className="pb-4">
                  <h3 className="font-semibold text-cyan-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Verification In Progress
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {pendingVerifications.map((v) => (
                      <div 
                        key={v.id}
                        className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {v.status === 'pending' ? (
                            <Clock className="h-5 w-5 text-amber-500" />
                          ) : (
                            <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />
                          )}
                          <div>
                            <p className="font-medium text-cyan-900 capitalize">
                              {v.method.replace('_', ' ')} Verification
                            </p>
                            <p className="text-xs text-cyan-600">
                              {v.status === 'pending' ? 'Submitted' : 'Under Review'} • {' '}
                              {new Date(v.submitted_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${v.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
                        `}>
                          {v.status === 'pending' ? 'Pending' : 'Reviewing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Profile Preview */}
            <Card className="shadow-neumorphic">
              <CardHeader className="pb-4">
                <h3 className="font-semibold text-cyan-900">Profile Preview</h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center">
                    {profile.photo_url ? (
                      <img 
                        src={profile.photo_url} 
                        alt={profile.display_name || ''} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-cyan-600">
                        {profile.first_name?.[0]}{profile.last_name?.[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-cyan-900">
                        {profile.display_name || `${profile.first_name} ${profile.last_name}`}
                      </h4>
                      <VerificationBadge tier={profile.verification_tier} size="sm" />
                    </div>
                    <p className="text-sm text-cyan-600 mb-2">
                      {profile.role?.replace('_', ' ')} • {profile.city}, {profile.state}
                    </p>
                    <p className="text-sm text-cyan-700 line-clamp-2">
                      {profile.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-cyan-100 flex gap-2 flex-wrap">
                  {profile.modalities?.slice(0, 4).map((m) => (
                    <span key={m} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">
                      {m}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade CTA */}
            {profile.verification_tier !== 'certified' && (
              <Card className="shadow-neumorphic bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-6 text-center">
                  <Star className="h-10 w-10 text-amber-500 mx-auto mb-3" fill="currentColor" />
                  <h3 className="font-bold text-cyan-900 mb-2">
                    Upgrade to Certified
                  </h3>
                  <p className="text-sm text-cyan-700 mb-4">
                    Get featured placement, analytics, and CPD tracking.
                  </p>
                  <Link href="/pricing">
                    <Button className="w-full bg-gradient-gold text-cyan-900 hover:opacity-90">
                      View Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="shadow-neumorphic">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-cyan-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Link href="/onboarding" className="block">
                    <Button variant="ghost" className="w-full justify-start text-cyan-700">
                      <Edit className="h-4 w-4 mr-3" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-cyan-700"
                    onClick={() => setShowVerificationModal(true)}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Submit Verification
                  </Button>
                  <Link href={`/practitioner/${profile.slug}`} className="block">
                    <Button variant="ghost" className="w-full justify-start text-cyan-700">
                      <ExternalLink className="h-4 w-4 mr-3" />
                      View Public Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="shadow-neumorphic">
              <CardContent className="p-4">
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Verification Modal */}
      {showVerificationModal && (
        <VerificationModal 
          profile={profile}
          onClose={() => setShowVerificationModal(false)}
          onSuccess={() => {
            setShowVerificationModal(false);
            // Refresh verifications
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50/50">
      <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
