'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CartItemRow } from './CartItemRow';

export const CartView: React.FC = () => {
  const { cart, subtotal, totalItems, clearCart, isLoaded } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Dynamic calculations
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% estimated tax
  const grandTotal = subtotal + shipping + tax;

  const handleProceedToCheckout = () => {
    if (!user) {
      // Prompt user to sign in or proceed as guest
      router.push('/login?redirect=/cart');
      return;
    }

    // Mock checkout action
    setCheckoutSuccess(true);
    clearCart();
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500">
        Loading cart items...
      </div>
    );
  }

  if (checkoutSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Order Confirmed!</h1>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Thank you for testing the showcase! Your mock order has been logged for{' '}
          <strong className="text-slate-800">{user?.name || 'Customer'}</strong>.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/products"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Shopping Cart</h1>
        <p className="mt-1 text-xs text-slate-500">
          Review your selected audio devices and proceed to checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="mt-12 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-base font-semibold text-slate-900">Your cart is empty</h2>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            You haven&apos;t added any studio headphones or sound systems yet.
          </p>
          <Link
            href="/products"
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Cart Item List */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Item Details ({totalItems})
              </span>
              <button
                onClick={clearCart}
                className="text-xs font-medium text-red-600 transition hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                &larr; Continue shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold tracking-tight text-slate-900">Order Summary</h2>

              <div className="mt-5 space-y-3 border-b border-slate-100 pb-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900">Total</span>
                <span className="text-xl font-extrabold text-indigo-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* User Session Banner */}
              <div className="mt-5 rounded-lg border border-slate-200/80 bg-slate-50 p-3 text-[11px] text-slate-600">
                {user ? (
                  <p>
                    Checking out as:{' '}
                    <strong className="font-semibold text-slate-800">{user.name}</strong> (
                    {user.isGuest ? 'Guest Session' : user.email})
                  </p>
                ) : (
                  <p className="text-slate-500">
                    You can check out as a <strong className="text-slate-700">Guest</strong> or Sign
                    In on the next step.
                  </p>
                )}
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="mt-5 w-full rounded-lg bg-indigo-600 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                {user ? 'Complete Demo Order' : 'Proceed to Checkout'}
              </button>

              <p className="mt-3 text-center text-[10px] text-slate-400">
                Safe 256-bit encryption checkout simulation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
