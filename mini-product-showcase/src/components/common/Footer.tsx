import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
                A
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Aero<span className="text-indigo-400">Audio</span>
              </span>
            </Link>
            <p className="max-w-md text-sm text-slate-400">
              Showcasing precision acoustic engineering and premium smart audio devices. Built as a
              high-performance Next.js technical showcase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-white">
                  Explore Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Assignment Details
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Stack: Next.js 14/15, TypeScript</li>
              <li>Styling: Tailwind CSS</li>
              <li>State: React Context + Storage</li>
              <li>SEO: Semantic HTML & Metadata API</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AeroAudio Showcase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
