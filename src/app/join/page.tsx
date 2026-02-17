import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Check,
  Star,
  CheckCircle,
  Circle,
  ArrowRight,
} from 'lucide-react';

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-cyan py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-900 mb-4">
              Join FindPAT as a Practitioner
            </h1>
            <p className="text-lg text-cyan-700 max-w-2xl mx-auto">
              Get discovered by clients seeking psychedelic-assisted therapy
              and connect with practitioners for collaboration.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-cyan-900 text-center mb-8">
              Choose Your Plan
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Listed - Free */}
              <Card className="shadow-neumorphic border-l-4 border-l-cyan-400">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-cyan-400 text-cyan-900 shadow-cyan-glow">
                      <Circle className="h-4 w-4" />
                      Listed
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-cyan-900">Free</span>
                    <span className="text-cyan-600"> forever</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Basic profile listing</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Appear in search results</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Contact information displayed</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-500">
                      <span className="h-5 w-5 flex-shrink-0 mt-0.5 text-center">—</span>
                      <span>Self-reported credentials only</span>
                    </li>
                  </ul>

                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-600 text-cyan-700"
                  >
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>

              {/* Verified - $149/yr */}
              <Card className="shadow-neumorphic border-l-4 border-l-green-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white shadow-green-glow">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-cyan-900">$149</span>
                    <span className="text-cyan-600">/year</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Everything in Listed</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Credential verification</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Verified badge on profile</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Priority in search results</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Verified
                  </Button>
                </CardContent>
              </Card>

              {/* Certified - $299/yr */}
              <Card className="shadow-neumorphic border-l-4 border-l-amber-400">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-gold text-cyan-900 shadow-gold-glow">
                      <Star className="h-4 w-4" fill="currentColor" />
                      Certified
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-cyan-900">$299</span>
                    <span className="text-cyan-600">/year</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Everything in Verified</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Gold Certified badge</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Featured placement</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Profile analytics</span>
                    </li>
                    <li className="flex items-start gap-2 text-cyan-700">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>CPD tracking</span>
                    </li>
                  </ul>

                  <Button 
                    variant="outline"
                    className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
                  >
                    Get Certified
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Signup Form */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-cyan-900 text-center mb-2">
                Start with a Free Listing
              </h2>
              <p className="text-cyan-600 text-center mb-8">
                Create your profile in 5 minutes. Upgrade anytime.
              </p>

              <Card className="shadow-neumorphic">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-cyan-800">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Dr. Jane Smith"
                        className="mt-1 bg-white border-cyan-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-cyan-800">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="mt-1 bg-white border-cyan-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-cyan-800">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        className="mt-1 bg-white border-cyan-200"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 mt-2"
                    >
                      Create Free Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>

                  <p className="text-xs text-cyan-500 text-center mt-4">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-cyan-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline hover:text-cyan-700">
                      Privacy Policy
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
