'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <span className="text-xl font-semibold text-cyan-900">
            Find<span className="text-cyan-600">PAT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/search" 
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900 transition-colors"
          >
            Find Practitioners
          </Link>
          <Link 
            href="/search?userType=practitioner" 
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900 transition-colors"
          >
            Find Collaborators
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/join">
            <Button variant="outline" className="border-cyan-600 text-cyan-700 hover:bg-cyan-50">
              Join as Practitioner
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-cyan-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                href="/search" 
                className="text-lg font-medium text-cyan-900 py-2"
                onClick={() => setOpen(false)}
              >
                Find Practitioners
              </Link>
              <Link 
                href="/search?userType=practitioner" 
                className="text-lg font-medium text-cyan-900 py-2"
                onClick={() => setOpen(false)}
              >
                Find Collaborators
              </Link>
              <Link 
                href="/about" 
                className="text-lg font-medium text-cyan-900 py-2"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <hr className="border-cyan-200" />
              <Link href="/join" onClick={() => setOpen(false)}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Join as Practitioner
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
