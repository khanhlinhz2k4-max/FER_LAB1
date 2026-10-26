import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getReviewsByProductId } from "@/lib/reviews";
import { ReviewsSection } from "@/components/ReviewsSection";

export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Not Found | Atelier Rose" };
  }

  return { title: `${product.name} | Atelier Rose` };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Fetch reviews directly on the server so they are present in the initial HTML
  const reviewsData = await getReviewsByProductId(product.id);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#FBF4EE] via-[#F8EDE9] to-[#F1E4DE] text-[#3F2A2A] selection:bg-[#EAA5AB]/30 overflow-hidden">
      {/* ── Soft Ambient Decorative Background Orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      >
        <div className="absolute -top-32 -left-28 w-[34rem] h-[34rem] rounded-full bg-[#EAA5AB]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#F5C7B8]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-[#E0BFD5]/20 blur-3xl" />
      </div>

      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            className="rounded-full bg-white/70 hover:bg-white text-[#7A4E4E] border border-[#ECD7D1]/70 px-4 py-2 text-xs sm:text-sm shadow-2xs backdrop-blur-xs transition-all"
          >
            <Link href="/" data-testid="link-back">
              &larr; Back to Capsule Edit
            </Link>
          </Button>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9E6569] hidden sm:inline-block">
            Maison Atelier • Capsule 2026
          </span>
        </div>

        {/* Product Showcase Card */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 bg-[#FFFDFB]/85 p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#ECD7D1] shadow-[0_12px_45px_rgba(183,122,125,0.08)] backdrop-blur-md"
          data-testid="product-detail"
        >
          {/* Image Container with Floating Luxury Badge */}
          <div className="relative group rounded-3xl overflow-hidden bg-[#FAF3EF] border border-[#ECD7D1]/80 aspect-[3/4] sm:aspect-[4/5] shadow-xs">
            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 text-[#8B4C52] border border-[#ECD7D1] shadow-xs backdrop-blur-md">
              Atelier Silk Edition
            </span>

            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-center">
            {/* Category Tag */}
            <div className="mb-2">
              <span 
                className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#9E6569] px-2.5 py-1 rounded-md bg-[#FAF0EC] border border-[#ECD7D1]/80"
                data-testid="detail-category"
              >
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#3F2A2A] mb-3 leading-tight tracking-tight"
              data-testid="detail-name"
            >
              {product.name}
            </h1>

            {/* Price with Boutique Note */}
            <div className="flex items-baseline gap-3 mb-5">
              <span 
                className="text-2xl sm:text-3xl text-[#9E454D] font-bold font-serif"
                data-testid="detail-price"
              >
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#8A5A5D] font-medium">
                • Complimentary Boutique Courier &amp; Gift Box
              </span>
            </div>

            {/* Description Card */}
            <div className="prose prose-sm text-[#7A4E4E] mb-6 p-4 rounded-2xl bg-[#FAF4F0]/70 border border-[#ECD7D1]/60 leading-relaxed text-xs sm:text-sm">
              <p data-testid="detail-description">{product.description}</p>
            </div>

            {/* Size Selector (Visual Boutique Pill Options) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A5A5D]">
                  Select Silhouette Size
                </span>
                <span className="text-[11px] text-[#A84A52] font-semibold cursor-pointer hover:underline">
                  Size &amp; Fit Guide
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {["XS", "S", "M", "L"].map((size, idx) => (
                  <button
                    key={size}
                    type="button"
                    className={`h-9 w-12 rounded-xl text-xs font-bold transition-all border ${
                      idx === 1
                        ? "bg-[#A84A52] text-white border-[#A84A52] shadow-xs"
                        : "bg-white text-[#5C3236] border-[#ECD7D1] hover:border-[#C4757C] hover:bg-[#FAF0EC]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="flex-1 rounded-2xl bg-gradient-to-r from-[#9E454D] via-[#A84A52] to-[#8C3C43] hover:from-[#8C3C43] hover:to-[#783339] text-white py-6 text-base font-semibold shadow-md shadow-[#A84A52]/20 cursor-pointer">
                Add to Boutique Bag
              </Button>
              <div className="shrink-0">
                <FavoriteButton productId={product.id} />
              </div>
            </div>

            {/* Concierge Assurance Badges */}
            <div className="mt-7 pt-5 border-t border-[#ECD7D1]/70 grid grid-cols-2 gap-3 text-[11px] text-[#7A4E4E]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D46]" />
                <span>100% Mulberry Silk 22 Momme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D46]" />
                <span>Hand-finished French Seams</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section: Server-rendered + Client Interactive via ReviewsContext */}
        <ReviewsSection
          productId={product.id}
          initialReviews={reviewsData.reviews}
          initialAverage={reviewsData.average}
          initialCount={reviewsData.count}
        />
      </main>
    </div>
  );
}

