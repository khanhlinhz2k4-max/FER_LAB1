import { z } from "zod";

export const reviewSchema = z.object({
  product_id: z
    .number()
    .int("Product ID must be an integer")
    .positive("Product ID must be a positive integer"),
  rating: z
    .number({
      error: "Rating must be between 1 and 5",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .trim()
    .min(1, "Comment must be at least 1 character")
    .max(500, "Comment must be at most 500 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

export interface Review {
  id: number;
  user_id?: string;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}
