import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { ProductListContent } from '@/components/product/ProductListContent';

export const metadata: Metadata = {
  title: 'All Audio Equipment & Hardware',
  description:
    'Browse our complete catalog of studio headphones, wireless earbuds, and spatial sound speakers with filter and search capabilities.',
  openGraph: {
    title: 'AeroAudio Catalog | Browse Headphones, Earbuds & Speakers',
    description: 'Explore the full lineup of high-performance acoustics with warranty support.',
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500">
          Loading catalog...
        </div>
      }
    >
      <ProductListContent initialProducts={products} />
    </Suspense>
  );
}
