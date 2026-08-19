import React from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/common/ContactForm';

export const metadata: Metadata = {
  title: 'About Us & Contact',
  description:
    'Learn about AeroAudio engineering standards, our acoustic mission, and connect with our support team.',
  openGraph: {
    title: 'About AeroAudio & Technical Contact',
    description: 'Precision acoustic engineering showcase built with Next.js and TypeScript.',
  },
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Acoustic Precision',
      desc: 'Custom-tuned 45mm dynamic drivers designed for low harmonic distortion and flat-frequency fidelity across studio environments.',
    },
    {
      title: 'Modern Architecture',
      desc: 'Engineered with Next.js App Router, TypeScript strict typing, and accessible Tailwind UI design patterns.',
    },
    {
      title: 'Zero Latency Connectivity',
      desc: 'Next-gen wireless codecs paired with high-performance digital signal processing for gaming and studio playback.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
          Our Story & Mission
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Crafting Studio-Grade Audio Hardware
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          AeroAudio was founded with a singular focus: deliver uncompromised sound reproduction
          through minimalist, durable industrial design. Every headphone, earbud, and speaker is
          calibrated for clarity and endurance.
        </p>
      </div>

      {/* Pillars Section */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Engineering Standards</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                0{idx + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Info Grid */}
      <section className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Contact Info */}
        <div className="space-y-6 lg:col-span-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Get in Touch</h2>
            <p className="mt-2 text-xs text-slate-500">
              Have questions regarding our product lineup or technical assignment setup? Drop a note
              below.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-xs text-slate-600 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                📍
              </span>
              <div>
                <strong className="block text-slate-900">Showcase Headquarters</strong>
                <span>HITEC City, Hyderabad, Telangana, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                ✉️
              </span>
              <div>
                <strong className="block text-slate-900">Email Support</strong>
                <span>contact@aeroaudio.example.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                ⏱️
              </span>
              <div>
                <strong className="block text-slate-900">Evaluation Support Window</strong>
                <span>Monday – Friday: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-4 text-base font-bold text-slate-900">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
