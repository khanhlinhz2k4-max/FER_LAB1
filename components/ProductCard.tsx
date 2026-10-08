import React from "react";
import type { Product } from "@/data/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="group flex flex-col overflow-hidden rounded-3xl border border-[#ECD7D1] bg-[#FFFDFB]/95 hover:border-[#D9A2A8] shadow-[0_8px_30px_rgba(183,122,125,0.07)] hover:shadow-[0_20px_50px_rgba(183,122,125,0.18)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF3EF] border-b border-[#ECD7D1]/60">
        {/* Boutique Tag */}
        <span className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/90 text-[#8B4C52] border border-[#ECD7D1] shadow-xs backdrop-blur-xs">
          Artisanal
        </span>

        {/* Wishlist Icon Button */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <FavoriteButton productId={product.id} />
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.id}`} data-testid="link-detail" className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            data-testid="product-image"
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Header: Name */}
      <CardHeader className="p-5 sm:p-6 pb-2">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9E6569]">
            Capsule Edition
          </span>
          <div className="flex items-center gap-1 text-[#C4757C]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-[#5A3838]">5.0</span>
          </div>
        </div>
        <CardTitle
          data-testid="product-name"
          className="text-base sm:text-lg font-bold text-[#3F2A2A] group-hover:text-[#A84A52] transition-colors font-serif leading-snug"
        >
          {product.name}
        </CardTitle>
      </CardHeader>

      {/* Content: Description */}
      <CardContent className="p-5 sm:p-6 pt-0 flex-1">
        <CardDescription
          data-testid="product-description"
          className="text-xs sm:text-sm text-[#7A4E4E]/85 leading-relaxed"
        >
          {product.description}
        </CardDescription>
      </CardContent>

      {/* Footer: Price & Stock Status */}
      <CardFooter className="p-5 sm:p-6 pt-3 flex items-center justify-between border-t border-[#F5E6E2] mt-auto bg-[#FFFDFB]/60">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#9E6569] block font-medium">
            Price
          </span>
          <span
            data-testid="product-price"
            className="text-lg sm:text-xl font-bold text-[#9E454D] tracking-tight font-serif"
          >
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FAF0EC] px-3 py-1.5 rounded-full border border-[#ECD7D1]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3C8D46] animate-pulse" />
          <span className="text-[11px] font-semibold text-[#6C3C41] tracking-wide">
            In Stock
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
