import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { reviewSchema } from "@/lib/reviewSchema";
import { products } from "@/data/products";

export async function POST(request: Request) {
  // 1. Authentication check
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = match[1].trim();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Validation check with reviewSchema
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid input", issues: [{ message: "Malformed JSON body" }] },
      { status: 400 }
    );
  }

  const validation = reviewSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: validation.error.issues },
      { status: 400 }
    );
  }

  const { product_id, rating, comment } = validation.data;

  // 3. Product check
  const productExists = products.some((p) => p.id === product_id);
  if (!productExists) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 4. Scoped Supabase client with user's token (RLS applied)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Note: user_id and author come from database defaults, not from the request
  const { data: createdReview, error: insertError } = await userClient
    .from("reviews")
    .insert([
      {
        product_id,
        rating,
        comment,
      },
    ])
    .select("id, product_id, rating, comment, author, created_at, user_id")
    .single();

  if (insertError) {
    // Check for Postgres unique constraint violation
    if (insertError.code === "23505") {
      return NextResponse.json(
        { error: "You already reviewed this product" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: insertError.message || "Failed to create review" },
      { status: 500 }
    );
  }

  // 5. Revalidate cached product page
  revalidatePath(`/products/${product_id}`);

  return NextResponse.json(createdReview, { status: 201 });
}
