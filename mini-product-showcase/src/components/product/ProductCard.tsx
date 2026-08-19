'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-100"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur">
          {product.category}
        </span>

        {/* Stock Badge */}
        {!product.inStock && (
          <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500">
            <span className="font-bold">★ {product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-base font-semibold text-slate-900">
            <Link
              href={`/products/${product.id}`}
              className="transition-colors hover:text-indigo-600"
            >
              {product.name}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:cursor-pointer hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
};
