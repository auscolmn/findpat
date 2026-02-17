'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
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

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-9 bg-gray-100 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="outline" className="border-cyan-600 text-cyan-700 hover:bg-cyan-50">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 rounded-lg"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-cyan-700 hover:text-cyan-900">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20">
                    List Your Profile
                  </Button>
                </Link>
              </>
            )}
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
                
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        handleSignOut();
                      }}
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        List Your Profile
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full border-cyan-600 text-cyan-700">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Sticky Mobile CTA (only on certain pages, hidden when user is logged in) */}
      {!user && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-cyan-200 p-3 shadow-lg">
          <Link href="/register" className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-base py-6 shadow-lg shadow-green-600/20">
              List Your Profile — Free
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
