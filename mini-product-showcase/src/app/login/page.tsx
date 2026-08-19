import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthView } from '@/components/auth/AuthView';

export const metadata: Metadata = {
  title: 'Sign In or Guest Access',
  description: 'Log into your AeroAudio account or proceed seamlessly as a guest customer.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16 text-center text-xs text-slate-500">
          Loading authentication interface...
        </div>
      }
    >
      <AuthView />
    </Suspense>
  );
}
