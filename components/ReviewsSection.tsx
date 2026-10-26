"use client";

import React from "react";
import type { Review } from "@/lib/reviewSchema";
import { ReviewsProvider, useReviews } from "@/contexts/ReviewsContext";
import { ReviewForm } from "./ReviewForm";
import { ReviewItem } from "./ReviewItem";

interface ReviewsSectionProps {
  productId: number;
  initialReviews: Review[];
  initialAverage: number;
  initialCount: number;
}

function ReviewsContent({ productId }: { productId: number }) {
  const { reviews } = useReviews();

  const count = reviews.length;
  const average =
    count > 0
      ? Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / count) * 10) / 10
      : 0;

  return (
    <section className="mt-16 pt-12 border-t border-[#ECD7D1]">
      {/* ── Section Title & Headline ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E6569] block mb-1">
            Client Testimonials &amp; Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#3F2A2A] tracking-tight">
            Verified Atelier Reviews
          </h2>
        </div>

        <span className="text-xs text-[#8A5A5D] font-medium hidden sm:inline-block">
          Authentic client experiences with Atelier craftsmanship
        </span>
      </div>

      {/* ── Luxury Rating Scoreboard ── */}
      <div className="bg-[#FFFDFB]/90 p-6 sm:p-7 rounded-3xl border border-[#ECD7D1] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xs">
        {/* Left: Big Score & Stars */}
        <div className="flex items-center gap-5 sm:gap-6 self-start md:self-auto">
          <div className="flex flex-col items-center justify-center pr-6 border-r border-[#ECD7D1]/80">
            <div className="flex items-baseline gap-1">
              <span
                data-testid="rating-average"
                className="text-4xl sm:text-5xl font-extrabold font-serif text-[#9E454D] leading-none"
              >
                {average}
              </span>
              <span className="text-sm font-serif font-medium text-[#7A4E4E]/80">/ 5</span>
            </div>

            {/* Visual Stars Display next to rating */}
            <div className="flex items-center gap-1 text-sm mt-2 text-[#D4898E]">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= Math.round(average) ? "text-[#C4757C]" : "text-[#E6D0CA]"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#7A4E4E] flex items-center gap-1 font-medium">
              <span
                data-testid="review-count"
                className="font-extrabold text-[#3F2A2A] text-sm"
              >
                {count}
              </span>
              <span>{count === 1 ? "verified client review" : "verified client reviews"}</span>
            </div>
            <p className="text-[11px] text-[#A98E8E] mt-1">
              {count > 0
                ? "100% of reviews from authenticated purchasers"
                : "Awaiting initial styling feedback"}
            </p>
          </div>
        </div>

        {/* Right: Rating Distribution Bars (Visual Luxury Breakdown) */}
        <div className="w-full md:w-64 space-y-1.5 text-[11px] text-[#8A5A5D]">
          {[5, 4, 3, 2, 1].map((stars) => {
            const countForStar = reviews.filter((r) => r.rating === stars).length;
            const pct = count > 0 ? Math.round((countForStar / count) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-7 text-right font-semibold">{stars} ★</span>
                <div className="flex-1 h-2 rounded-full bg-[#FAF0EC] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4898E] to-[#BA6770] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-[10px] text-[#A98E8E] text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form Component */}
      <ReviewForm productId={productId} />

      {/* Reviews List */}
      <div className="mt-8 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div
            data-testid="reviews-empty"
            className="text-center py-14 px-6 rounded-3xl bg-[#FFFDFB]/90 border border-[#ECD7D1] text-[#7A4E4E] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF0EC] text-[#BA6770] flex items-center justify-center mx-auto mb-3 shadow-2xs font-serif text-lg font-bold">
              ✦
            </div>
            <p className="text-sm font-bold text-[#3F2A2A]">
              There are no reviews for this piece yet.
            </p>
            <p className="text-xs text-[#A98E8E] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Be the first to share your styling feedback, silhouette drape, and material touch with our atelier.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ReviewsSection({
  productId,
  initialReviews,
}: ReviewsSectionProps) {
  return (
    <ReviewsProvider productId={productId} initialReviews={initialReviews}>
      <ReviewsContent productId={productId} />
    </ReviewsProvider>
  );
}
