import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  const categories = [
    {
      name: 'Headphones',
      desc: 'High-fidelity acoustic isolation',
      href: '/products?category=Headphones',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Earbuds',
      desc: 'Compact everyday wireless freedom',
      href: '/products?category=Earbuds',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Speakers',
      desc: 'Immersive room-filling spatial audio',
      href: '/products?category=Speakers',
      image:
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 ring-1 ring-indigo-500/30 ring-inset">
              Next-Gen Studio Sound
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Precision Acoustics for Pure Immersion.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              Engineered with custom titanium drivers and hybrid noise cancellation. Discover
              handcrafted audio designed for producers, creators, and audiophiles.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Our Technology
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-baseline justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Explore by Category
            </h2>
            <p className="text-sm text-slate-500">
              Pick your audio equipment by listening environment.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View All Catalog &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative h-64 overflow-hidden rounded-2xl bg-slate-900 shadow-md"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover opacity-60 transition duration-300 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-400">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured Releases</h2>
          <p className="text-sm text-slate-500">
            Our flagship acoustics and highest-rated audio hardware.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Trust / Value Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-8 sm:grid-cols-3">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900">Free Express Delivery</h3>
            <p className="text-xs text-slate-500">
              Complimentary 2-day delivery on all domestic hardware orders.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900">2-Year Limited Warranty</h3>
            <p className="text-xs text-slate-500">
              Full factory support and replacement on drivers and electronics.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900">30-Day Studio Trial</h3>
            <p className="text-xs text-slate-500">
              Experience true sound clarity with risk-free home returns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
