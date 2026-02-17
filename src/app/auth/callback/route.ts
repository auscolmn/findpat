import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/onboarding';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Create or update profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, onboarding_status')
        .eq('id', data.user.id)
        .single();

      if (!existingProfile) {
        // Create profile for new user
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          onboarding_status: 'not_started',
          email_confirmed_at: new Date().toISOString(),
        });
      } else {
        // Update email confirmation timestamp
        await supabase
          .from('profiles')
          .update({ email_confirmed_at: new Date().toISOString() })
          .eq('id', data.user.id);
      }

      // Redirect based on onboarding status
      const redirectTo = existingProfile?.onboarding_status === 'complete' 
        ? '/dashboard' 
        : '/onboarding';

      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // Return to register with error
  return NextResponse.redirect(`${origin}/register?error=auth`);
}
