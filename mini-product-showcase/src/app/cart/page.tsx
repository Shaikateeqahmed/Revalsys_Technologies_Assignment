import React from 'react';
import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Your Shopping Cart',
  description: 'Review your selected audio devices and prepare for checkout.',
};

export default function CartPage() {
  return <CartView />;
}
