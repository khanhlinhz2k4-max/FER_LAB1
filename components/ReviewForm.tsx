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
      <div className="p-6 rounded-2xl bg-[#FFFDFB] border border-[#ECD7D1] shadow-xs text-center my-6">
        <p className="text-sm text-[#7A4E4E] mb-3">
          Have you purchased this piece? Share your thoughts with our atelier.
        </p>
        <Button asChild className="rounded-xl bg-[#A84A52] hover:bg-[#8F3F45] text-white">
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
        className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-800"
      >
        {successMessage}
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
    <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFDFB] border border-[#ECD7D1] shadow-xs my-6">
      <h3 className="text-lg font-bold font-serif text-[#3F2A2A] mb-1">
        Write a Review
      </h3>
      <p className="text-xs text-[#7A4E4E]/80 mb-5">
        Share your experience and craftsmanship feedback with other clients.
      </p>

      {serverError && (
        <div
          data-testid="error-review"
          className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800"
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="review-form"
        className="space-y-4"
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
          className="rounded-xl bg-[#A84A52] hover:bg-[#8F3F45] text-white px-6 font-semibold"
        >
          {isSubmitting ? "Publishing..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
