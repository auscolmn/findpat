'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Loader2 } from 'lucide-react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || "You're on the list!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to join waitlist. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-xl text-green-700">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === 'error') setStatus('idle');
        }}
        className="flex-1 h-12 bg-white border-cyan-200 focus:border-cyan-500 shadow-inset"
        disabled={status === 'loading'}
      />
      <Button 
        type="submit" 
        className="h-12 px-8 bg-green-600 hover:bg-green-700 shadow-raised"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Join Waitlist'
        )}
      </Button>
      {status === 'error' && (
        <p className="text-red-500 text-sm text-center sm:text-left sm:absolute sm:mt-14">
          {message}
        </p>
      )}
    </form>
  );
}
