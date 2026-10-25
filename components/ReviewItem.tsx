"use client";

import React, { useState } from "react";
import type { Review } from "@/lib/reviewSchema";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { Button } from "@/components/ui/button";

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  const { user } = useAuth();
  const { updateReview, deleteReview } = useReviews();

  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if this review belongs to the logged-in user
  const isOwnReview = Boolean(
    user &&
      ((review.user_id && user.id && review.user_id === user.id) ||
        (user.email &&
          review.author &&
          review.author.toLowerCase() === user.email.split("@")[0].toLowerCase()))
  );

  const handleUpdate = async () => {
    setEditError(null);
    if (!editComment.trim()) {
      setEditError("Comment cannot be empty");
      return;
    }
    if (editComment.trim().length > 500) {
      setEditError("Comment cannot exceed 500 characters");
      return;
    }

    setIsUpdating(true);
    try {
      await updateReview(editRating, editComment.trim());
      setIsEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setEditError(err.message);
      } else {
        setEditError("Failed to update review");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteReview();
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      data-testid="review-item"
      className="p-5 rounded-2xl bg-[#FFFDFB] border border-[#ECD7D1] shadow-xs flex flex-col gap-3 transition-all hover:border-[#D9A2A8]"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Avatar icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4898E] to-[#E29A98] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
            {review.author ? review.author.charAt(0).toUpperCase() : "A"}
          </div>

          <div>
            <span
              data-testid="review-author"
              className="font-bold text-sm text-[#3F2A2A] block"
            >
              {review.author}
            </span>
            <span className="text-[11px] text-[#A98E8E]">
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Recent"}
            </span>
          </div>
        </div>

        {/* Rating and Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0EC] border border-[#ECD7D1]">
            <span
              data-testid="review-rating"
              className="text-xs font-bold text-[#A84A52]"
            >
              {review.rating}
            </span>
            <span className="text-xs text-[#A84A52]">★</span>
          </div>

          {/* Edit / Delete Buttons (only on own review) */}
          {isOwnReview && !isEditing && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-edit-review"
                onClick={() => setIsEditing(true)}
                className="h-7 px-2.5 text-xs rounded-lg border-[#ECD7D1] text-[#7A4E4E] hover:bg-[#FAF0EC]"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-delete-review"
                disabled={isDeleting}
                onClick={handleDelete}
                className="h-7 px-2.5 text-xs rounded-lg border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                {isDeleting ? "..." : "Delete"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Editing Mode */}
      {isEditing ? (
        <div className="mt-2 pt-3 border-t border-[#ECD7D1]/70 space-y-3">
          {editError && (
            <p className="text-xs text-rose-600 font-medium">{editError}</p>
          )}

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#8A5A5D]">Rating:</label>
            <select
              value={editRating}
              onChange={(e) => setEditRating(Number(e.target.value))}
              className="px-2.5 py-1 rounded-lg border border-[#ECD7D1] text-xs font-medium text-[#3F2A2A] bg-white"
            >
              <option value="5">5 - Exceptional</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Disappointing</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
          </div>

          <textarea
            rows={3}
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#ECD7D1] text-xs text-[#3F2A2A] bg-white focus:outline-none focus:ring-1 focus:ring-[#C4757C]"
          />

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              disabled={isUpdating}
              onClick={handleUpdate}
              className="h-7 text-xs rounded-lg bg-[#A84A52] hover:bg-[#8F3F45] text-white"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setEditRating(review.rating);
                setEditComment(review.comment);
                setEditError(null);
              }}
              className="h-7 text-xs rounded-lg text-[#7A4E4E]"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        /* Display Mode */
        <p
          data-testid="review-comment"
          className="text-xs sm:text-sm text-[#5A3838] leading-relaxed pt-1"
        >
          {review.comment}
        </p>
      )}
    </div>
  );
}
