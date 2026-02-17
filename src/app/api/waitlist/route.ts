import { NextResponse } from 'next/server';

// In production, this would connect to Supabase
// For now, we'll store in memory (resets on server restart)
const waitlist: Set<string> = new Set();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already on waitlist
    if (waitlist.has(email.toLowerCase())) {
      return NextResponse.json(
        { message: "You're already on the waitlist!" },
        { status: 200 }
      );
    }

    // Add to waitlist
    waitlist.add(email.toLowerCase());

    // In production, you would:
    // 1. Store in Supabase
    // 2. Send confirmation email
    // 3. Track analytics

    console.log(`[Waitlist] New signup: ${email} (Total: ${waitlist.size})`);

    return NextResponse.json(
      { message: "You're on the list! We'll notify you when we launch." },
      { status: 200 }
    );
  } catch {
    console.error('[Waitlist] Error:', Error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to check waitlist count (would be protected in production)
  return NextResponse.json({
    count: waitlist.size,
    emails: process.env.NODE_ENV === 'development' ? Array.from(waitlist) : undefined,
  });
}
