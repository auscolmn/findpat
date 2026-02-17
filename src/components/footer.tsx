import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-cyan-900 text-cyan-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400">
                <span className="text-lg font-bold text-cyan-900">F</span>
              </div>
              <span className="text-xl font-semibold text-white">
                Find<span className="text-cyan-300">PAT</span>
              </span>
            </Link>
            <p className="text-cyan-300 text-sm max-w-xs">
              The trusted directory for psychedelic-assisted therapy practitioners. 
              Find verified professionals or connect with collaborators.
            </p>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-cyan-300 hover:text-white transition-colors">
                  Find a Practitioner
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="text-cyan-300 hover:text-white transition-colors">
                  Coverage & Costs
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-cyan-300 hover:text-white transition-colors">
                  How Verification Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cyan-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Practitioners */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Practitioners</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join" className="text-cyan-300 hover:text-white transition-colors">
                  Get Listed
                </Link>
              </li>
              <li>
                <Link href="/search?userType=practitioner" className="text-cyan-300 hover:text-white transition-colors">
                  Find Collaborators
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-cyan-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-cyan-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cyan-400 text-sm">
            © {new Date().getFullYear()} FindPAT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-cyan-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-cyan-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-cyan-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
