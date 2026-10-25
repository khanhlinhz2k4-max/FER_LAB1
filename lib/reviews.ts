import { supabase } from "@/lib/supabaseClient";
import type { Review } from "./reviewSchema";

export interface ReviewsResponse {
  average: number;
  count: number;
  reviews: Review[];
}

export async function getReviewsByProductId(productId: number): Promise<ReviewsResponse> {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, user_id, product_id, rating, comment, author, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getReviewsByProductId] Error fetching reviews:", error);
      return { average: 0, count: 0, reviews: [] };
    }

    const reviews: Review[] = data || [];
    const count = reviews.length;

    if (count === 0) {
      return { average: 0, count: 0, reviews: [] };
    }

    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    // Rounded to 1 decimal place (e.g. 4.5, 3.0 -> 3 or 3.0 as number)
    const average = Math.round((totalRating / count) * 10) / 10;

    return {
      average,
      count,
      reviews,
    };
  } catch (err) {
    console.error("[getReviewsByProductId] Unexpected error:", err);
    return { average: 0, count: 0, reviews: [] };
  }
}
