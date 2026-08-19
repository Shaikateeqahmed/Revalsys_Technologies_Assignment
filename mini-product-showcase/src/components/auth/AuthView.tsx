'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export const AuthView: React.FC = () => {
  const { user, login, continueAsGuest, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/products';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // Standard login simulation
    const displayName = mode === 'signup' ? name : email.split('@')[0];
    login(email, displayName);
    router.push(redirectPath);
  };

  const handleGuestAccess = () => {
    continueAsGuest();
    router.push(redirectPath);
  };

  // If user is already authenticated
  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Active Session</h1>
          <p className="mt-1 text-xs text-slate-500">
            You are logged in as <strong className="text-slate-800">{user.name}</strong> (
            {user.isGuest ? 'Guest User' : user.email})
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href={redirectPath}
              className="rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              Continue to {redirectPath === '/cart' ? 'Checkout' : 'Store'}
            </Link>
            <button
              onClick={logout}
              className="rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Switch Account / Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
            A
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {mode === 'signin'
              ? 'Enter your details or proceed instantly as a guest.'
              : 'Sign up to track mock orders and save presets.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Guest Option Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 font-medium text-slate-400">or quick access</span>
          </div>
        </div>

        {/* Continue as Guest Button */}
        <button
          type="button"
          onClick={handleGuestAccess}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <svg
            className="h-4 w-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Continue as Guest Customer
        </button>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {mode === 'signin' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-semibold text-indigo-600 underline hover:text-indigo-500"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="font-semibold text-indigo-600 underline hover:text-indigo-500"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
