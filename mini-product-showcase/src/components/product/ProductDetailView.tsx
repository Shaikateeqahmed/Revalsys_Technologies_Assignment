'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="transition-colors hover:text-slate-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="transition-colors hover:text-slate-900">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="transition-colors hover:text-slate-900"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="max-w-[200px] truncate text-slate-900 sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {!product.inStock && (
              <span className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
                Out of Stock
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square h-20 overflow-hidden rounded-lg border-2 bg-white transition ${
                    selectedImage === img
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {product.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-base text-slate-600">{product.tagline}</p>

              {/* Rating Summary */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex text-sm text-amber-500">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 border-y border-slate-200 py-4">
              <span className="text-3xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
                Product Overview
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
                  Key Capabilities
                </h2>
                <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart Button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                    className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={!product.inStock}
                    className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {product.inStock
                    ? `Add to Cart • $${(product.price * quantity).toFixed(2)}`
                    : 'Currently Sold Out'}
                </button>
              </div>

              {addedToast && (
                <div className="animate-fadeIn flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
                  <span>✓ Added {quantity} item(s) to your cart!</span>
                  <Link href="/cart" className="font-bold underline hover:text-emerald-900">
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <section className="mt-16 border-t border-slate-200 pt-10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Hardware & Technical Specifications
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Factory benchmarked metrics and hardware specifications.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100">
              {Object.entries(product.specs).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50/50">
                  <td className="w-1/3 bg-slate-50/80 px-6 py-3.5 text-xs font-semibold tracking-wide text-slate-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </td>
                  <td className="px-6 py-3.5 text-xs text-slate-600">
                    {typeof val === 'boolean' ? (val ? 'Supported' : 'Not supported') : val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
