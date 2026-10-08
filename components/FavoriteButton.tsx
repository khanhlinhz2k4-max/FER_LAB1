"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "./ui/button";

export function FavoriteButton({ productId }: { productId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(productId);

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-xl transition-colors ${
        favorite 
          ? "bg-[#FAD2D6] text-[#A84A52] hover:bg-[#F8BBD0]" 
          : "bg-white text-[#7A4E4E] hover:bg-[#FDF4F1]"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      data-testid="btn-favorite"
      aria-pressed={favorite ? "true" : "false"}
    >
      <svg 
        className="w-5 h-5" 
        fill={favorite ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </Button>
  );
}
