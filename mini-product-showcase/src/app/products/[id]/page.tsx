import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductById } from '@/lib/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested audio hardware could not be located.',
    };
  }

  return {
    title: `${product.name} | AeroAudio`,
    description: product.tagline || product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} - Studio Precision Audio`,
      description: product.description.slice(0, 155),
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

// Pre-render static pages for all mock products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
