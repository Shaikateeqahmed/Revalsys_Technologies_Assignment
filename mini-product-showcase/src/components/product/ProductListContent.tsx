'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductListContentProps {
  initialProducts: Product[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductListContent: React.FC<ProductListContentProps> = ({ initialProducts }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filter states from URL search params if present
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Headphones', 'Earbuds', 'Speakers', 'Accessories'];

  // Handle category button click and update URL
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPrice;
        const matchesStock = inStockOnly ? product.inStock : true;

        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.isFeatured ? -1 : 1; // Default: featured
      });
  }, [initialProducts, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(350);
    setSortBy('featured');
    setInStockOnly(false);
    router.replace('/products', { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Audio Hardware & Devices
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Browse studio headphones, earbuds, and spatial sound equipment.
        </p>
      </div>

      {/* Search & Top Controls */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative max-w-md flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audio gear by name or spec..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          <svg
            className="absolute top-2.5 left-3 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-2 right-3 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Dropdown & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs font-medium whitespace-nowrap text-slate-500">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters (Desktop + Mobile Toggle) */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-20 lg:block lg:h-fit`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase">
              Refine Results
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
            >
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Category
            </h3>
            <div className="mt-3 flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-50 font-bold text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider Filter */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Max Price
              </h3>
              <span className="text-xs font-bold text-slate-900">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={350}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-indigo-600"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>$50</span>
              <span>$350</span>
            </div>
          </div>

          {/* Stock Filter Toggle */}
          <div className="border-t border-slate-100 pt-5">
            <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div>
              <p className="mb-4 text-xs text-slate-500">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> audio
                products
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <span className="text-3xl">🎧</span>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                No matching audio products found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Try widening your price range, clearing search terms, or switching category filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
