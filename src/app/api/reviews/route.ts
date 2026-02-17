import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      practitioner_id,
      rating,
      outcome_rating,
      treatment_type,
      condition_treated,
      review_text,
      would_recommend,
      treatment_month,
      treatment_year,
      token,
    } = body;

    // Validate required fields
    if (!practitioner_id || !rating || !outcome_rating || !treatment_type || !condition_treated || would_recommend === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Verify practitioner exists
    const { data: practitioner, error: practitionerError } = await supabase
      .from('profiles')
      .select('id, is_published')
      .eq('id', practitioner_id)
      .single();

    if (practitionerError || !practitioner) {
      return NextResponse.json(
        { error: 'Practitioner not found' },
        { status: 404 }
      );
    }

    // Handle token verification if provided
    let tokenId: string | null = null;
    let isVerified = false;

    if (token) {
      // Verify and use the token
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('use_review_token', { p_token: token });

      if (tokenError || !tokenData) {
        return NextResponse.json(
          { error: 'Invalid or expired review token' },
          { status: 400 }
        );
      }

      tokenId = tokenData;
      isVerified = true;
    }

    // Insert the review
    const { data: review, error: insertError } = await supabase
      .from('reviews')
      .insert({
        practitioner_id,
        rating,
        outcome_rating,
        treatment_type,
        condition_treated,
        review_text: review_text || null,
        would_recommend,
        treatment_month: treatment_month || null,
        treatment_year: treatment_year || null,
        token_id: tokenId,
        is_verified: isVerified,
        status: 'pending', // All reviews start as pending for moderation
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting review:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit review' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      review: {
        id: review.id,
        is_verified: review.is_verified,
        status: review.status,
      },
    });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get reviews (with optional practitioner filter)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const practitionerId = searchParams.get('practitioner_id');
    const status = searchParams.get('status') || 'approved';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (practitionerId) {
      query = query.eq('practitioner_id', practitionerId);
    }

    const { data: reviews, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
