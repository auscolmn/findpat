import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ReviewForm } from '@/components/reviews';
import { samplePractitioners } from '@/data/practitioners';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function ReviewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { token } = await searchParams;
  
  // Find the practitioner
  const practitioner = samplePractitioners.find((p) => p.slug === slug);

  if (!practitioner) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {/* Back Link */}
          <Link
            href={`/practitioner/${slug}`}
            className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to practitioner profile
          </Link>

          {/* Privacy Notice */}
          <div className="bg-cyan-100/50 rounded-xl p-5 mb-8 border border-cyan-200">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-cyan-200 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-cyan-700" />
              </div>
              <div>
                <h2 className="font-semibold text-cyan-900 mb-1">
                  Your Privacy is Protected
                </h2>
                <p className="text-sm text-cyan-700">
                  Reviews on FindPAT are completely anonymous. We do not collect your name, 
                  email, or any identifying information. Your feedback helps others find 
                  quality care while protecting your privacy.
                </p>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <ReviewForm
            practitionerId={practitioner.id}
            practitionerName={practitioner.name}
            token={token}
          />

          {/* Trust Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-600">
              <Shield className="h-4 w-4" />
              <span>All reviews are moderated for quality and appropriateness</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return samplePractitioners.map((p) => ({
    slug: p.slug,
  }));
}
