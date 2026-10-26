"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewFormData } from "@/lib/reviewSchema";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
  productId: number;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const { user } = useAuth();
  const { myReview, submitReview } = useReviews();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      comment: "",
    },
  });

  // 1. Logged out state: show link to log in
  if (!user) {
    return (
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFFDFB] to-[#FAF3EF] border border-[#ECD7D1] shadow-xs text-center my-8">
        <div className="w-11 h-11 rounded-2xl bg-[#FAF0EC] text-[#BA6770] flex items-center justify-center mx-auto mb-3 shadow-2xs font-serif text-lg font-bold">
          ✦
        </div>
        <h4 className="text-base font-serif font-bold text-[#3F2A2A] mb-1">
          Share Your Styling Perspective
        </h4>
        <p className="text-xs text-[#7A4E4E]/85 mb-5 max-w-md mx-auto leading-relaxed">
          Have you acquired this piece? Sign in to your Atelier Society account to share your craftsmanship review.
        </p>
        <Button asChild className="rounded-full bg-[#A84A52] hover:bg-[#8F3F45] text-white px-7 py-2.5 text-xs font-semibold shadow-sm">
          <Link href="/login" data-testid="link-login-to-review">
            Sign in to Review
          </Link>
        </Button>
      </div>
    );
  }

  // If newly submitted with success message, display success banner
  if (successMessage) {
    return (
      <div
        data-testid="review-success"
        className="my-8 p-5 rounded-3xl bg-gradient-to-r from-emerald-50/90 to-teal-50/90 border border-emerald-200/80 text-xs sm:text-sm font-medium text-emerald-800 shadow-xs flex items-center gap-3"
      >
        <span className="w-7 h-7 rounded-full bg-emerald-200/80 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
          ✓
        </span>
        <span>{successMessage}</span>
      </div>
    );
  }

  // 2. Logged in and already reviewed: hide form (edit/delete are in the review list)
  if (myReview) {
    return null;
  }

  // 3. Logged in with no review yet: show form
  const onSubmit = async (data: ReviewFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await submitReview(data.rating, data.comment);
      setSuccessMessage("Your review has been published successfully.");
      reset({ product_id: productId, comment: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-[#FFFDFB]/95 border border-[#ECD7D1] shadow-xs my-8 backdrop-blur-xs">
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E6569] block mb-1">
          Concierge Feedback
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3F2A2A]">
          Share Your Atelier Review
        </h3>
        <p className="text-xs text-[#7A4E4E]/80 mt-1">
          Describe the silhouette, fabric drape, and craftsmanship for fellow clients.
        </p>
      </div>

      {serverError && (
        <div
          data-testid="error-review"
          className="mb-5 p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-xs sm:text-sm font-medium text-rose-800 flex items-center gap-2.5 shadow-xs"
        >
          <span className="text-rose-600 font-bold">!</span>
          <span>{serverError}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="review-form"
        className="space-y-5"
        noValidate
      >
        <input type="hidden" {...register("product_id", { valueAsNumber: true })} />

        {/* Rating Select */}
        <div>
          <label
            htmlFor="rating-select"
            className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A5D] mb-1.5"
          >
            Your Rating
          </label>
          <select
            id="rating-select"
            data-testid="input-rating"
            defaultValue=""
            {...register("rating", { valueAsNumber: true })}
            className="w-full sm:w-48 px-3 py-2 rounded-xl border border-[#ECD7D1] bg-[#FAF5F2] text-sm font-medium text-[#3F2A2A] focus:outline-none focus:ring-2 focus:ring-[#C4757C]"
          >
            <option value="">Select rating</option>
            <option value="5">5 - Exceptional</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Disappointing</option>
            <option value="1">1 - Unsatisfactory</option>
          </select>
          {errors.rating && (
            <p data-testid="error-rating" className="text-xs text-rose-600 mt-1">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Comment Textarea */}
        <div>
          <label
            htmlFor="comment-input"
            className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A5D] mb-1.5"
          >
            Review Comment
          </label>
          <textarea
            id="comment-input"
            rows={4}
            placeholder="Describe the fabric quality, drape, tailoring, or fit..."
            data-testid="input-comment"
            {...register("comment")}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECD7D1] bg-[#FAF5F2] text-sm text-[#3F2A2A] placeholder:text-[#A98E8E] focus:outline-none focus:ring-2 focus:ring-[#C4757C]"
          />
          {errors.comment && (
            <p data-testid="error-comment" className="text-xs text-rose-600 mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          data-testid="btn-submit-review"
          disabled={isSubmitting}
          className="rounded-2xl bg-gradient-to-r from-[#9E454D] via-[#A84A52] to-[#8C3C43] hover:from-[#8C3C43] hover:to-[#783339] text-white px-7 py-2.5 font-semibold text-sm shadow-md shadow-[#A84A52]/20 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? "Publishing Review..." : "Publish Atelier Review"}
        </Button>
      </form>
    </div>
  );
}
