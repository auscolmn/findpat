import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST - Generate a review token for a practitioner
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { client_email } = body;

    // Verify the user is a practitioner
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, is_published, slug')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Practitioner profile not found' },
        { status: 404 }
      );
    }

    // Generate the token
    const { data: token, error: tokenError } = await supabase
      .rpc('generate_review_token', {
        p_practitioner_id: user.id,
        p_client_email: client_email || null,
      });

    if (tokenError || !token) {
      console.error('Error generating token:', tokenError);
      return NextResponse.json(
        { error: 'Failed to generate review token' },
        { status: 500 }
      );
    }

    // Construct the review URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://findpat.com.au';
    const reviewUrl = `${baseUrl}/review/${profile.slug}?token=${token}`;

    return NextResponse.json({
      success: true,
      token,
      review_url: reviewUrl,
      expires_in_days: 30,
    });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - List review tokens for the authenticated practitioner
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const includeUsed = searchParams.get('include_used') === 'true';

    let query = supabase
      .from('review_tokens')
      .select('*')
      .eq('practitioner_id', user.id)
      .order('created_at', { ascending: false });

    if (!includeUsed) {
      query = query.eq('is_used', false).gt('expires_at', new Date().toISOString());
    }

    const { data: tokens, error } = await query;

    if (error) {
      console.error('Error fetching tokens:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tokens' },
        { status: 500 }
      );
    }

    return NextResponse.json({ tokens });
  } catch (error) {
    console.error('Tokens fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
