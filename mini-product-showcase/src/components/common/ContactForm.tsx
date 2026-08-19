'use client';

import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-base font-bold">Message Received</h3>
        <p className="mt-1 text-xs text-emerald-700">
          Thank you, <strong>{formData.name}</strong>. We&apos;ve logged your inquiry and our
          support team will respond shortly.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
          }}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Jordan Lee"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="jordan@example.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700">Inquiry Topic</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        >
          <option>General Inquiry</option>
          <option>Product Support & Warranty</option>
          <option>Order Inquiries</option>
          <option>Technical Evaluation Feedback</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700">Message *</label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we assist you with our audio hardware?"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        Submit Message
      </button>
    </form>
  );
};
