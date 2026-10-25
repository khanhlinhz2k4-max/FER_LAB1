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
    <section className="mt-14 pt-10 border-t border-[#ECD7D1]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E6569] block mb-1">
            Client Voices &amp; Ratings
          </span>
          <h2 className="text-2xl font-extrabold font-serif text-[#3F2A2A]">
            Verified Customer Reviews
          </h2>
        </div>

        {/* Rating Summary Card */}
        <div className="flex items-center gap-3 bg-[#FFFDFB] px-4 py-2.5 rounded-2xl border border-[#ECD7D1] shadow-xs self-start sm:self-auto">
          <div className="flex items-baseline gap-1">
            <span
              data-testid="rating-average"
              className="text-2xl font-extrabold font-serif text-[#A84A52]"
            >
              {average}
            </span>
            <span className="text-xs font-medium text-[#7A4E4E]/80">/ 5</span>
          </div>

          <div className="h-6 w-px bg-[#ECD7D1]" />

          <div className="text-xs text-[#7A4E4E]">
            <span
              data-testid="review-count"
              className="font-bold text-[#3F2A2A] mr-1"
            >
              {count}
            </span>
            <span>{count === 1 ? "review" : "reviews"}</span>
          </div>
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
            className="text-center py-12 rounded-2xl bg-[#FFFDFB] border border-[#ECD7D1] text-[#7A4E4E]"
          >
            <p className="text-sm">There are no reviews for this piece yet.</p>
            <p className="text-xs text-[#A98E8E] mt-1">
              Be the first to share your styling feedback.
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
