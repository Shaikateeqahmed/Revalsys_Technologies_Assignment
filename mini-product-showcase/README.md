# AeroAudio — Mini Product Showcase Website

A high-performance, responsive e-commerce product showcase built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed and developed as part of the technical evaluation for the **Angular & Next.js Developer** position at **Revalsys Technologies**.

---

## 🚀 Live Demo & Repository

- **Source Code Repository:** [GitHub Repository URL](https://github.com/Shaikateeqahmed/Revalsys_Technologies_Assignment/tree/main/mini-product-showcase)

---

## 🛠️ Tech Stack & Tooling

| Domain               | Technology                 | Purpose                                                       |
| :------------------- | :------------------------- | :------------------------------------------------------------ |
| **Framework**        | Next.js 14/15 (App Router) | Server Components, hybrid rendering, and dynamic routing      |
| **Language**         | TypeScript                 | Strict type safety, interfaces, and maintainability           |
| **Styling**          | Tailwind CSS               | Utility-first responsive design and micro-interactions        |
| **State Management** | React Context API          | Client state for Cart and Auth/Guest persistence              |
| **Code Quality**     | ESLint + Prettier          | Consistent style guide and Tailwind class auto-sorting        |
| **Images**           | `next/image`               | Automated WebP conversion, responsive sizes, and lazy loading |

---

## 📦 Project Setup Instructions

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**, **yarn**, or **pnpm**

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/Shaikateeqahmed/Revalsys_Technologies_Assignment.git
cd mini-product-showcase

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Production Build & Typecheck
npm run build

# Start Production Server
npm run start

# Code Formatting (Prettier)
npm run format
```

## ✨ Features Implemented

### 1. Home Page (`/`)

- **Hero Section:** Value proposition, high-impact CTA, and decorative background styling.
- **Category Navigation:** Direct filter tiles for Headphones, Earbuds, and Speakers.
- **Featured Releases Grid:** Server-rendered flagship products.
- **Trust Elements:** Value badges highlighting shipping, warranty, and return policies.

### 2. Product Listing & Filtering (`/products`)

- **Real-Time Search:** Client-side fuzzy text filtering across product titles and tags.
- **Category Filter:** Multi-category selector syncing with URL search parameters.
- **Price Range Filter:** Interactive slider filtering products up to $350.
- **Sorting Mechanisms:** Sort by Featured, Price (Low to High), Price (High to Low), and Rating.
- **Stock Availability Filter:** Toggle for immediately available hardware.

### 3. Dynamic Product Detail Page (`/products/[id]`)

- **Dynamic Routing & SSG:** Powered by `generateStaticParams` for pre-rendering.
- **Dynamic SEO Metadata:** Automated OpenGraph and meta descriptions per item via `generateMetadata`.
- **Interactive Image Gallery:** Multi-angle image preview switcher.
- **Technical Specification Matrix:** Key-value breakdown of acoustics, connectivity, and battery.
- **Quantity Selector & Add to Cart:** Real-time subtotal calculator with interactive feedback toast.

### 4. Shopping Cart & Order Summary (`/cart`)

- **Persistent State:** Synchronized with `localStorage` (SSR hydration safe).
- **Cart Operations:** Item quantity increments/decrements, item deletion, and clear cart.
- **Order Calculation:** Automated item counts, 8% tax calculation, and free shipping thresholds ($150+).
- **Checkout Guard:** Context-aware routing prompting non-authenticated users to log in or checkout as a guest.

### 5. Authentication & Guest Handling (`/login`)

- **User Authentication:** Email and password login simulation.
- **Instant Guest Checkout:** Allows immediate checkout without requiring registration.
- **Redirect Support:** Retains referral path (`?redirect=/cart`) to preserve user workflow.

### 6. About Us & Contact Page (`/about`)

- **Brand Standards:** Overview of acoustic engineering philosophy and design principles.
- **Interactive Contact Form:** Client-side validation, inquiry topic selection, and submission confirmations.

---

## 🏛️ Architectural Decisions

- **Next.js App Router & Hybrid Rendering:**
  - Server Components (`RSC`) are used by default across pages (`/`, `/products`, `/about`) to optimize Time to First Byte (TTFB) and search engine indexing.
  - Client components are isolated strictly where interactivity is required (`ProductListContent`, `ProductDetailView`, `CartView`, `AuthView`).

- **Decoupled State Management:**
  - React Context is separated into domain-specific providers (`CartContext` and `AuthContext`) wrapped under an `AppProviders` abstraction layer to prevent unnecessary re-renders.
  - Initial state hydration uses safe `useEffect` mounting cycles to avoid React hydration mismatches with `localStorage`.

- **SEO Best Practices & Semantic Architecture:**
  - Strict heading hierarchy across all routes (`h1` for primary title, `h2` for section demarcations, `h3` for product/feature titles).
  - Global layout metadata combined with granular `generateMetadata` exports on dynamic product routes.
  - Fully semantic HTML structure using `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, and `<footer>`.

---

## 🤖 AI Tools & Platforms Utilized

In accordance with the assignment guidelines, AI-assisted workflows were utilized to accelerate development:

- **Architecture & Scaffolding:** Gemini Pro were used to structure the initial folder layout, TypeScript interface schema, and realistic mock dataset (`products.json`).
- **CSS & Responsive Layouts:** AI prompts assisted in generating Tailwind CSS responsive grid compositions, mobile filter drawer states, and interactive hover transitions.
- **Documentation & Testing Plan:** AI-assisted validation for edge-case scenarios (e.g., zero-quantity cart handling, SSR hydration mismatch prevention, and query param synchronization).

---

## 📌 Assumptions & Limitations

- **Data Source:** Static JSON dataset (`src/data/products.json`) is used in place of an external REST/GraphQL API.
- **Authentication Simulation:** User and Guest sessions are persisted in browser `localStorage` without backend JWT verification.
- **Checkout Flow:** Payment integration is simulated with interactive confirmation states.

---

## Prompts written to complate the Assignment

- I got the mail regarding coding Assignment, below is the mail
  I have given the complete content of mail.
  lets start with the scratch, I want to do step by step. 1st let start with the whole assignment into steps for better development.

- Please also configure the prettier

- Let's create the TypeScript interfaces and mock JSON dataset for our product showcase.

- Let's build the CartContext and AuthContext state managers with localStorage persistence.

- Let's build the Root Layout with SEO metadata, Navbar, and Footer components.

- Let's build the Home Page with the Hero section, category tiles, and Featured Products.

- Let's build the Product Listing Page with search, category filtering, and price sorting.

- Let's build the dynamic product detail page with image gallery, specs, dynamic SEO, and Add to Cart.

- Let's build the Cart Page with item management and Order Summary.

- Let's build the Login and Guest User Handling page.

- Let's build the About Us and Contact Us page.

- Let's generate the complete submission README.md covering setup instructions, architectural decisions, SEO, and AI tooling.
