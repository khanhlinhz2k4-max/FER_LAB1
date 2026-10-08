import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = (typeof resolvedParams.q === 'string' ? resolvedParams.q : '')?.toLowerCase();
  const category = (typeof resolvedParams.category === 'string' ? resolvedParams.category : '')?.toLowerCase();

  let filteredProducts = products;

  if (q) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FBF4EE] via-[#F8EDE9] to-[#F1E4DE] text-[#3F2A2A] selection:bg-[#EAA5AB]/30">
      {/* ── Soft Ambient Decorative Background Orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      >
        <div className="absolute -top-32 -left-28 w-[34rem] h-[34rem] rounded-full bg-[#EAA5AB]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#F5C7B8]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-[#E0BFD5]/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#E8C2B5]/20 blur-3xl" />
      </div>

      {/* ── Top Announcement Bar ── */}
      <div className="w-full bg-gradient-to-r from-[#874349] via-[#9E4D54] to-[#874349] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide shadow-xs">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FAD2D6] animate-pulse" />
          ✨ Atelier Spring / Summer 2026: Complimentary Worldwide Boutique Shipping on orders over $150
        </span>
      </div>

      {/* ── Header ── */}
      <Header />

      {/* ── Main Content Area ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12">
        {/* ── Sleek Compact Hero Section with Luxury Silk Background ── */}
        <section className="relative overflow-hidden rounded-3xl border border-[#ECD7D1] p-6 sm:p-8 lg:p-9 mb-7 shadow-[0_12px_40px_rgba(183,122,125,0.08)] bg-[#FDF6F3]">
          {/* Background Silk Image */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src="/hero-banner.jpg"
              alt="Luxury Silk Banner Background"
              className="w-full h-full object-cover object-right opacity-90"
            />
            {/* Soft gradient mask on left to ensure high readability of text */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF2EE] via-[#FAF2EE]/90 sm:via-[#FAF2EE]/85 to-transparent sm:w-3/5" />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E9D1CB] text-[#80484E] text-[11px] font-semibold uppercase tracking-wider mb-2.5 shadow-xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA6770] animate-pulse" />
              Maison de Couture • Spring / Summer 2026
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3F2A2A] tracking-tight font-serif leading-tight">
              The Art of Gentle Sophistication
            </h1>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-[#7A4E4E]/90 leading-relaxed font-normal max-w-xl">
              Immerse yourself in handpicked mulberry silks, whisper-soft Mongolian
              cashmere, and artisanal leather accessories in timeless warm pastel harmonies.
            </p>

            {/* CTAs & Highlights */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-xl shadow-md shadow-[#BE6B72]/20 font-semibold text-xs sm:text-sm h-9 px-4"
              >
                <a href="#collection-heading">
                  Discover Collection
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl font-semibold text-xs sm:text-sm bg-white/90 hover:bg-white h-9 px-4"
              >
                <Link href="/register">
                  Join Atelier Society
                </Link>
              </Button>
              <span className="text-[11px] text-[#8A5A5D] font-medium hidden sm:inline-block ml-1">
                • Complimentary Shipping on orders $150+
              </span>
            </div>
          </div>
        </section>

        {/* ── Product Grid Section (Prominently visible directly below Hero) ── */}
        <section id="collection-section" aria-labelledby="collection-heading" className="scroll-mt-24 mb-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 pb-3 border-b border-[#ECD7D1]/70">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9E6569] block mb-1">
                The Capsule Edit
              </span>
              <h2
                id="collection-heading"
                className="text-2xl sm:text-3xl font-extrabold text-[#3F2A2A] tracking-tight font-serif"
              >
                Curated Spring Garments
              </h2>
              <p className="text-xs sm:text-sm text-[#7A4E4E]/80 mt-1">
                Showing {filteredProducts.length} handcrafted boutique pieces
              </p>
            </div>

            {/* Filter Pills (Visual Boutique Tags) and Search Form */}
            <div className="flex flex-col sm:items-end gap-3">
              <form method="get" action="/" className="flex flex-wrap items-center gap-2 bg-[#FFFDFB] p-2 rounded-xl border border-[#ECD7D1] shadow-xs">
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={q} 
                  placeholder="Search products..." 
                  data-testid="search-input"
                  className="px-3 py-1.5 rounded-lg text-sm bg-transparent border-none focus:ring-1 focus:ring-[#C4757C] outline-none text-[#3F2A2A] placeholder:text-[#A98E8E]"
                />
                <select 
                  name="category" 
                  defaultValue={category || ""} 
                  data-testid="category-select"
                  className="px-3 py-1.5 rounded-lg text-sm bg-transparent border-none focus:ring-1 focus:ring-[#C4757C] outline-none text-[#3F2A2A] cursor-pointer"
                >
                  <option value="">All</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <Button 
                  type="submit" 
                  data-testid="btn-search"
                  size="sm"
                  className="rounded-lg bg-[#A84A52] hover:bg-[#8F3F45] text-white"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>

          {/* Product Grid: 1 col on mobile (375px), 2 cols on tablet, 3 cols on desktop (1280px+) */}
          {filteredProducts.length > 0 ? (
            <div
              data-testid="product-list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div data-testid="no-results" className="text-center py-12 text-[#7A4E4E]">
              No products found.
            </div>
          )}
        </section>

        {/* ── Values / Highlights Section ── */}
        <section
          id="artisanal-values"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          <div className="p-5 rounded-2xl bg-[#FFFDFB]/80 border border-[#ECD7D1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F6E6E3] text-[#A84A52] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#3F2A2A]">Pure Mulberry Silk</h3>
            <p className="text-xs text-[#7A4E4E]/80 mt-1 leading-relaxed">
              Ethically spun natural threads crafted for breathtaking fluid drapes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDFB]/80 border border-[#ECD7D1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F6E6E3] text-[#A84A52] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#3F2A2A]">Artisanal Finishing</h3>
            <p className="text-xs text-[#7A4E4E]/80 mt-1 leading-relaxed">
              Every seam tailored with meticulous precision by experienced couturiers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDFB]/80 border border-[#ECD7D1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F6E6E3] text-[#A84A52] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#3F2A2A]">Bespoke Packaging</h3>
            <p className="text-xs text-[#7A4E4E]/80 mt-1 leading-relaxed">
              Delivered in signature dusty rose embossed gift boxes with keepsake ribbons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDFB]/80 border border-[#ECD7D1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F6E6E3] text-[#A84A52] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#3F2A2A]">Complimentary Returns</h3>
            <p className="text-xs text-[#7A4E4E]/80 mt-1 leading-relaxed">
              30 days effortless exchanges with concierge doorstep pickup.
            </p>
          </div>
        </section>

        {/* ── Editorial Quote Callout ── */}
        <section
          id="editorial-quote"
          className="my-16 text-center max-w-3xl mx-auto px-4 py-12 rounded-3xl bg-[#FFFDFB]/75 border border-[#ECD7D1] shadow-xs"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F7ECE8] text-[#9E454D] mb-4">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="text-lg sm:text-xl font-serif text-[#3F2A2A] italic leading-relaxed">
            &ldquo;A masterclass in modern pastel aesthetics — effortlessly romantic,
            exquisitely tailored for the contemporary wardrobe.&rdquo;
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-[#9E6569] font-bold mt-4">
            — Atelier Lookbook &amp; Vogue Editorial
          </p>
        </section>

        {/* ── VIP Newsletter Sign Up Teaser ── */}
        <section className="rounded-3xl bg-gradient-to-tr from-[#9B4850] via-[#863B42] to-[#713036] text-white p-8 sm:p-12 text-center shadow-lg shadow-[#863B42]/20">
          <div className="max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#F7D4D7] block mb-2">
              Private Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
              Join the Atelier Society
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F9ECEE]/90 leading-relaxed">
              Receive confidential showroom invitations, early capsule previews, and
              complimentary bespoke styling sessions.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/50 text-xs sm:text-sm"
              />
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-white text-[#713036] font-semibold text-xs sm:text-sm hover:bg-[#FDF4F1] transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                Join Society
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Luxury Multi-Column Footer ── */}
      <footer className="w-full border-t border-[#ECD7D1] bg-[#FFFDFB]/90 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#F0DDD9]">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2">
              <span className="text-lg font-bold font-serif text-[#3F2A2A] block">
                ATELIER ROSE
              </span>
              <p className="text-xs text-[#7A4E4E]/80 mt-2 max-w-sm leading-relaxed">
                Dedicated to artisanal craftsmanship and sustainable luxury.
                Bringing poetic soft silhouettes, natural silks, and delicate rosy
                palettes to contemporary living.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#8A5A5D]">
                <span>Paris</span> • <span>Milan</span> • <span>Tokyo</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3F2A2A] mb-3">
                Experience
              </h3>
              <ul className="space-y-2 text-xs text-[#7A4E4E]/85">
                <li>
                  <Link href="/login" className="hover:text-[#A84A52] transition-colors">
                    Client Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-[#A84A52] transition-colors">
                    Create Member Account
                  </Link>
                </li>
                <li>
                  <a href="#collection-heading" className="hover:text-[#A84A52] transition-colors">
                    Spring 2026 Collection
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Concierge Care */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3F2A2A] mb-3">
                Concierge Care
              </h3>
              <ul className="space-y-2 text-xs text-[#7A4E4E]/85">
                <li>
                  <a href="#shipping" className="hover:text-[#A84A52] transition-colors">
                    Boutique Delivery
                  </a>
                </li>
                <li>
                  <a href="#returns" className="hover:text-[#A84A52] transition-colors">
                    Care Instructions
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#A84A52] transition-colors">
                    Stylist Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7A4E4E]/75">
            <p>© 2026 Atelier Rose Haute Couture. All rights reserved. Lab 2 Architecture.</p>
            <div className="flex items-center gap-5">
              <a href="#privacy" className="hover:text-[#A84A52] transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-[#A84A52] transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-[#A84A52] transition-colors">
                Cookie Preferences
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
