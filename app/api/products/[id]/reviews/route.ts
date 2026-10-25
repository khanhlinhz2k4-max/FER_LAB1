import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getReviewsByProductId } from "@/lib/reviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const reviewsData = await getReviewsByProductId(productId);

  return NextResponse.json(reviewsData, { status: 200 });
}
