'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Product Info & Thumbnail */}
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${product.id}`}
          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </Link>

        <div>
          <span className="text-[11px] font-semibold tracking-wider text-indigo-600 uppercase">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-slate-900">
            <Link
              href={`/products/${product.id}`}
              className="transition-colors hover:text-indigo-600"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">${product.price.toFixed(2)} each</p>
        </div>
      </div>

      {/* Quantity & Subtotal Actions */}
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-white">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:cursor-pointer hover:bg-slate-50"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center text-xs font-semibold text-slate-800">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:cursor-pointer hover:bg-slate-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Item Total */}
        <div className="min-w-[70px] text-right">
          <span className="text-sm font-bold text-slate-900">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(product.id)}
          className="p-1 text-slate-400 transition-colors hover:cursor-pointer hover:text-red-600"
          aria-label={`Remove ${product.name} from cart`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
