"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";
import type { Review } from "@/lib/reviewSchema";

type ReviewAction =
  | { type: "SET"; payload: Review[] }
  | { type: "ADD"; payload: Review }
  | { type: "UPDATE"; payload: Review }
  | { type: "REMOVE"; payload: number };

function reviewsReducer(state: Review[], action: ReviewAction): Review[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state.filter((r) => r.id !== action.payload.id)];
    case "UPDATE":
      return state.map((r) =>
        r.id === action.payload.id ? action.payload : r
      );
    case "REMOVE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}

interface ReviewsContextType {
  reviews: Review[];
  myReview: Review | null;
  submitReview: (rating: number, comment: string) => Promise<Review>;
  updateReview: (rating: number, comment: string, id?: number) => Promise<Review>;
  deleteReview: (id?: number) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

interface ReviewsProviderProps {
  productId: number;
  initialReviews: Review[];
  children: ReactNode;
}

export function ReviewsProvider({
  productId,
  initialReviews,
  children,
}: ReviewsProviderProps) {
  const [reviews, dispatch] = useReducer(reviewsReducer, initialReviews);
  const { user } = useAuth();
  const router = useRouter();

  // Keep state in sync if initialReviews changes from server revalidation
  useEffect(() => {
    dispatch({ type: "SET", payload: initialReviews });
  }, [initialReviews]);

  // Find the logged-in user's review (by user_id or matching author email prefix)
  const myReview =
    user && reviews.length > 0
      ? reviews.find((r) => {
          if (r.user_id && user.id && r.user_id === user.id) return true;
          if (user.email) {
            const emailPrefix = user.email.split("@")[0].toLowerCase();
            if (r.author && r.author.toLowerCase() === emailPrefix) return true;
          }
          return false;
        }) ?? null
      : null;

  const submitReview = async (rating: number, comment: string): Promise<Review> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("You must be logged in to review");
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        rating,
        comment,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to submit review");
    }

    const createdReview: Review = result;
    dispatch({ type: "ADD", payload: createdReview });
    router.refresh();
    return createdReview;
  };

  const updateReview = async (
    rating: number,
    comment: string,
    id?: number
  ): Promise<Review> => {
    const reviewId = id ?? myReview?.id;
    if (!reviewId) {
      throw new Error("No review to update");
    }

    const { data, error } = await supabase
      .from("reviews")
      .update({ rating, comment })
      .eq("id", reviewId)
      .select("id, user_id, product_id, rating, comment, author, created_at")
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update review");
    }

    const updated: Review = data;
    dispatch({ type: "UPDATE", payload: updated });
    router.refresh();
    return updated;
  };

  const deleteReview = async (id?: number): Promise<void> => {
    const reviewId = id ?? myReview?.id;
    if (!reviewId) {
      return;
    }

    const previousReviews = [...reviews];

    // Optimistic delete: update UI first
    dispatch({ type: "REMOVE", payload: reviewId });

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      // Rollback on error
      dispatch({ type: "SET", payload: previousReviews });
      throw new Error(error.message || "Failed to delete review");
    }

    router.refresh();
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        myReview,
        submitReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
