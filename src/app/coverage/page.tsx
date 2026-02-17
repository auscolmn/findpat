import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Shield,
  Building2,
  Wallet,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Search,
} from 'lucide-react';

export const metadata = {
  title: 'Coverage & Costs | FindPAT',
  description: 'Understanding PAT coverage in Australia - Medicare, DVA, Private Health Insurance, and out-of-pocket costs for psychedelic-assisted therapy.',
};

export default function CoveragePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-cyan-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-medium">Coverage Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Understanding PAT Coverage in Australia
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Navigating the costs of psychedelic-assisted therapy can be confusing. 
              Here&apos;s everything you need to know about Medicare, DVA, private health insurance, 
              and out-of-pocket expenses.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Medicare Section */}
            <section id="medicare">
              <Card className="shadow-neumorphic overflow-hidden">
                <div className="bg-green-500 h-2" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-2xl">💚</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-900">Medicare</h2>
                      <p className="text-cyan-600">What&apos;s covered under Medicare</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        What Medicare Covers
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Psychiatrist Consultations</p>
                            <p className="text-sm text-cyan-600">
                              Initial assessments and follow-up appointments with psychiatrists can be claimed through Medicare.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Mental Health Care Plans</p>
                            <p className="text-sm text-cyan-600">
                              GP-referred sessions may qualify for Medicare rebates under mental health care plans.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Bulk Billing Availability
                      </h3>
                      <p className="text-cyan-700 mb-3">
                        Some practitioners offer bulk billing for eligible patients, meaning no out-of-pocket costs 
                        for the consultation component. However, medication costs are typically not bulk-billed.
                      </p>
                      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                          Bulk billing availability varies by practitioner. Look for the 
                          <Badge className="mx-1 bg-green-100 text-green-700">💚 Medicare</Badge> 
                          badge on practitioner profiles.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Current Limitations
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-cyan-700">
                            The psychedelic medicine itself (e.g., psilocybin) is not covered by the PBS. 
                            Patients pay full cost for the medication component.
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-cyan-700">
                            Extended therapy sessions during dosing may not have full Medicare coverage. 
                            Check with your practitioner for gap fees.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* DVA Section */}
            <section id="dva">
              <Card className="shadow-neumorphic overflow-hidden">
                <div className="bg-blue-500 h-2" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-900">DVA (Veterans)</h2>
                      <p className="text-cyan-600">Coverage for Australian veterans</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">$740M Funding Announcement</span>
                      </div>
                      <p className="text-blue-800">
                        The Australian Government has committed significant funding to veteran mental health, 
                        including access to emerging treatments like psychedelic-assisted therapy for eligible veterans.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        DVA Coverage Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Full Coverage Available</p>
                            <p className="text-sm text-cyan-600">
                              Eligible veterans with accepted PTSD claims can access fully-funded PAT treatment 
                              through DVA-approved providers.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Treatment-Resistant PTSD</p>
                            <p className="text-sm text-cyan-600">
                              Priority access for veterans with treatment-resistant PTSD who haven&apos;t 
                              responded to conventional treatments.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        How to Access DVA Coverage
                      </h3>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium flex-shrink-0">1</span>
                          <p className="text-cyan-700">Speak with your GP or psychiatrist about PAT eligibility</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium flex-shrink-0">2</span>
                          <p className="text-cyan-700">Ensure your condition is accepted under your DVA health card</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium flex-shrink-0">3</span>
                          <p className="text-cyan-700">Find a DVA-approved PAT practitioner on FindPAT</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium flex-shrink-0">4</span>
                          <p className="text-cyan-700">Request a referral and pre-approval from DVA if required</p>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Eligible Conditions
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-blue-200 text-blue-700">PTSD</Badge>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">Treatment-Resistant Depression</Badge>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">Anxiety Disorders</Badge>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">Moral Injury</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* PHI Section */}
            <section id="phi">
              <Card className="shadow-neumorphic overflow-hidden">
                <div className="bg-purple-500 h-2" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-900">Private Health Insurance</h2>
                      <p className="text-cyan-600">Understanding PHI coverage for PAT</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        What PHI May Cover
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Psychology Sessions</p>
                            <p className="text-sm text-cyan-600">
                              Extras cover often includes rebates for psychology and counselling sessions, 
                              including integration therapy.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-cyan-900">Hospital Psychiatric Admissions</p>
                            <p className="text-sm text-cyan-600">
                              Hospital cover may include inpatient psychiatric treatment at private facilities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        How to Check Your Policy
                      </h3>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium flex-shrink-0">1</span>
                          <p className="text-cyan-700">Log into your health fund&apos;s member portal or app</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium flex-shrink-0">2</span>
                          <p className="text-cyan-700">Check your Extras cover for &quot;Psychology&quot; or &quot;Mental Health&quot;</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium flex-shrink-0">3</span>
                          <p className="text-cyan-700">Call your insurer and specifically ask about psychedelic-assisted therapy coverage</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium flex-shrink-0">4</span>
                          <p className="text-cyan-700">Ask for pre-approval before starting treatment</p>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Typical Rebates
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-cyan-900">Psychology Sessions</p>
                          <p className="text-2xl font-bold text-purple-600">$50-$120</p>
                          <p className="text-sm text-cyan-600">per session rebate</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-cyan-900">Annual Limit</p>
                          <p className="text-2xl font-bold text-purple-600">$400-$1,500</p>
                          <p className="text-sm text-cyan-600">typical yearly cap</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Out of Pocket Section */}
            <section id="out-of-pocket">
              <Card className="shadow-neumorphic overflow-hidden">
                <div className="bg-amber-500 h-2" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-900">Out-of-Pocket Costs</h2>
                      <p className="text-cyan-600">What to expect when paying privately</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Typical Cost Range
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <p className="font-medium text-cyan-900">Psilocybin Course</p>
                          <p className="text-3xl font-bold text-cyan-700">$15,000 - $25,000</p>
                          <p className="text-sm text-cyan-600">Complete treatment program</p>
                        </div>
                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <p className="font-medium text-cyan-900">MDMA Therapy</p>
                          <p className="text-3xl font-bold text-cyan-700">$20,000 - $30,000</p>
                          <p className="text-sm text-cyan-600">Full treatment course</p>
                        </div>
                      </div>
                      <p className="text-sm text-cyan-600">
                        * Costs vary significantly between providers and treatment protocols. 
                        Always confirm pricing directly with your practitioner.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        What&apos;s Typically Included
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-cyan-700">Initial psychiatric assessment and eligibility screening</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-cyan-700">Preparation therapy sessions (2-4 sessions)</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-cyan-700">Medicine/dosing sessions with therapeutic support</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-cyan-700">Integration therapy sessions (4-8 sessions)</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-cyan-700">The psychedelic medicine itself</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">
                        Payment Plans
                      </h3>
                      <p className="text-cyan-700 mb-3">
                        Many practitioners offer payment plans to make treatment more accessible:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">Interest-free instalments</Badge>
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">Afterpay/Zip available</Badge>
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">Staged payments</Badge>
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">Superannuation release (early access)</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <Card className="shadow-neumorphic">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-900">Frequently Asked Questions</h2>
                      <p className="text-cyan-600">Common questions about PAT coverage</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h3 className="font-semibold text-cyan-900 mb-2">
                        Is MDMA therapy covered by Medicare?
                      </h3>
                      <p className="text-cyan-700">
                        Currently, the MDMA medication itself is not covered by Medicare or the PBS. 
                        However, the associated psychiatrist consultations and some therapy sessions 
                        may be partially rebated. Check with your practitioner about potential Medicare benefits.
                      </p>
                    </div>

                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h3 className="font-semibold text-cyan-900 mb-2">
                        Can I claim on my private health insurance?
                      </h3>
                      <p className="text-cyan-700">
                        It depends on your policy. Some extras covers include psychology and counselling 
                        rebates that may apply to integration therapy sessions. Contact your health fund 
                        directly and ask specifically about coverage for psychedelic-assisted therapy components.
                      </p>
                    </div>

                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h3 className="font-semibold text-cyan-900 mb-2">
                        How do I know if a practitioner bulk bills?
                      </h3>
                      <p className="text-cyan-700">
                        Look for the <Badge className="mx-1 bg-green-100 text-green-700">💚 Medicare</Badge> 
                        badge on practitioner profiles. You can also filter search results by coverage type 
                        to find bulk-billing practitioners. Always confirm bulk billing availability during 
                        your initial consultation.
                      </p>
                    </div>

                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h3 className="font-semibold text-cyan-900 mb-2">
                        What does DVA cover?
                      </h3>
                      <p className="text-cyan-700">
                        DVA can provide full coverage for eligible veterans with accepted mental health 
                        conditions, including PTSD. This may include the full cost of treatment when 
                        provided by DVA-approved practitioners. Contact DVA directly or speak with a 
                        veteran liaison officer to confirm your eligibility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <section className="text-center py-8">
              <Card className="shadow-neumorphic bg-gradient-to-br from-cyan-600 to-cyan-700">
                <CardContent className="p-8 md:p-12">
                  <Search className="h-12 w-12 text-cyan-100 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Find Practitioners That Accept Your Coverage
                  </h2>
                  <p className="text-cyan-100 mb-6 max-w-xl mx-auto">
                    Use our search filters to find practitioners who accept Medicare, DVA, 
                    or private health insurance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/search?coverage=medicare">
                      <Button className="bg-white text-cyan-700 hover:bg-cyan-50 gap-2">
                        <span>💚</span> Medicare Practitioners
                      </Button>
                    </Link>
                    <Link href="/search?coverage=dva">
                      <Button className="bg-white text-cyan-700 hover:bg-cyan-50 gap-2">
                        <span>🏥</span> DVA Practitioners
                      </Button>
                    </Link>
                    <Link href="/search?coverage=phi">
                      <Button variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                        <span>🛡️</span> PHI Accepted
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
