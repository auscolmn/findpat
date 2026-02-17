import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PractitionerCard } from '@/components/practitioner-card';
import { samplePractitioners } from '@/data/practitioners';
import { 
  Search, 
  Shield, 
  CheckCircle, 
  Users, 
  Star,
  ArrowRight,
  Heart,
  Briefcase,
} from 'lucide-react';
import { WaitlistForm } from '@/components/waitlist-form';

export default function HomePage() {
  // Featured practitioners (certified only)
  const featuredPractitioners = samplePractitioners
    .filter((p) => p.verificationTier === 'certified')
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-cyan py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-900 mb-6 leading-tight">
                Find Your{' '}
                <span className="text-cyan-600">PAT Practitioner</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-700 mb-10 max-w-2xl mx-auto">
                The trusted directory for Psychedelic-Assisted Therapy. 
                Find verified practitioners or connect with collaborators in your area.
              </p>

              {/* Two Path CTAs */}
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {/* Client Path */}
                <Link href="/search?userType=client">
                  <Card className="h-full shadow-raised hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-green-500 group">
                    <CardContent className="p-6 text-center">
                      <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                        <Heart className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-2">
                        I&apos;m Seeking Treatment
                      </h3>
                      <p className="text-sm text-cyan-600 mb-4">
                        Find verified PAT practitioners in your area
                      </p>
                      <div className="flex items-center justify-center text-green-600 font-medium text-sm group-hover:text-green-700">
                        Search Practitioners <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Practitioner Path */}
                <Link href="/search?userType=practitioner">
                  <Card className="h-full shadow-raised hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-cyan-500 group">
                    <CardContent className="p-6 text-center">
                      <div className="h-14 w-14 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500 transition-colors">
                        <Briefcase className="h-7 w-7 text-cyan-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-2">
                        I&apos;m a Practitioner
                      </h3>
                      <p className="text-sm text-cyan-600 mb-4">
                        Find collaborators to build your practice
                      </p>
                      <div className="flex items-center justify-center text-cyan-600 font-medium text-sm group-hover:text-cyan-700">
                        Find Collaborators <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-cyan-600 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white text-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">100+ Verified Practitioners</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Credential Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Practitioner Network</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-cyan-900 text-center mb-12">
              How FindPAT Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4 shadow-raised">
                  <Search className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">Search</h3>
                <p className="text-cyan-600 text-sm">
                  Find practitioners by location, specialty, and modality (MDMA, psilocybin, ketamine)
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4 shadow-raised">
                  <Shield className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">Verify</h3>
                <p className="text-cyan-600 text-sm">
                  Check credentials and certifications. Our Certified practitioners have verified training
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4 shadow-raised">
                  <Heart className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">Connect</h3>
                <p className="text-cyan-600 text-sm">
                  Book a consultation or reach out directly to start your healing journey
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Badges Explained */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-cyan-900 text-center mb-4">
              Trust Through Verification
            </h2>
            <p className="text-cyan-600 text-center mb-12 max-w-2xl mx-auto">
              Our three-tier verification system helps you find the right practitioner with confidence
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Certified */}
              <Card className="border-l-4 border-l-amber-400 shadow-neumorphic">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-gold text-cyan-900 shadow-gold-glow">
                      <Star className="h-4 w-4" fill="currentColor" />
                      Certified
                    </span>
                  </div>
                  <h3 className="font-semibold text-cyan-900 mb-2">Highest Trust</h3>
                  <p className="text-sm text-cyan-600">
                    Fully verified credentials, background checked, and meeting our highest standards of training
                  </p>
                </CardContent>
              </Card>

              {/* Verified */}
              <Card className="border-l-4 border-l-green-500 shadow-neumorphic">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white shadow-green-glow">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                  <h3 className="font-semibold text-cyan-900 mb-2">Credentials Confirmed</h3>
                  <p className="text-sm text-cyan-600">
                    Training certificates and professional licenses verified by our team
                  </p>
                </CardContent>
              </Card>

              {/* Listed */}
              <Card className="border-l-4 border-l-cyan-400 shadow-neumorphic">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-cyan-400 text-cyan-900 shadow-cyan-glow">
                      Listed
                    </span>
                  </div>
                  <h3 className="font-semibold text-cyan-900 mb-2">Self-Reported</h3>
                  <p className="text-sm text-cyan-600">
                    Profile information provided by practitioner, credentials not yet verified
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Practitioners */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-900">
                Featured Practitioners
              </h2>
              <Link href="/search">
                <Button variant="outline" className="border-cyan-600 text-cyan-700">
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredPractitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} />
              ))}
            </div>
          </div>
        </section>

        {/* For Practitioners CTA */}
        <section className="bg-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-cyan-900 mb-4">
                Are You a PAT Practitioner?
              </h2>
              <p className="text-cyan-600 mb-8">
                Join the trusted directory for psychedelic therapy professionals. 
                Get found by clients and connect with collaborators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/join">
                  <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
                    Get Listed — Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="border-cyan-600 text-cyan-700 text-lg px-8 py-6">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-cyan-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-cyan-600 mb-8">
                Join our waitlist to be notified when we launch new features and expand to your area.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
