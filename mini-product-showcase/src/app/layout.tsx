import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/context/AppProviders';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aeroaudio-showcase.vercel.app'),
  title: {
    default: 'AeroAudio | Premium Audio & Gadget Showcase',
    template: '%s | AeroAudio',
  },
  description:
    'Discover studio-grade headphones, earbuds, and spatial sound systems built with acoustic precision.',
  keywords: [
    'Audio',
    'Headphones',
    'Earbuds',
    'Wireless Speakers',
    'Next.js Showcase',
    'TypeScript',
  ],
  authors: [{ name: 'AeroAudio Developer' }],
  openGraph: {
    title: 'AeroAudio | Premium Audio Showcase',
    description: 'Explore high-fidelity wireless audio products with fast delivery and warranty.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AeroAudio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
