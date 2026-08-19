import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-slate-800">Product Not Found</h2>
      <p className="mt-2 max-w-sm text-xs text-slate-500">
        We couldn&apos;t find the audio product you were looking for. It may have been discontinued
        or moved.
      </p>
      <Link
        href="/products"
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        Return to Catalog
      </Link>
    </div>
  );
}
