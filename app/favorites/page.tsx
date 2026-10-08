"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { favorites } = useFavorites();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F3] text-[#3F2A2A]">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="favorites-page">
        <h1 className="text-3xl font-extrabold font-serif text-[#3F2A2A] mb-8">My Favorites</h1>
        
        {favoriteProducts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {favoriteProducts.map(product => (
              <div 
                key={product.id} 
                data-testid="favorite-item"
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#ECD7D1] shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-[#9E454D] font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline" className="hidden sm:inline-flex">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                  <FavoriteButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div data-testid="favorites-empty" className="text-center py-20 bg-white rounded-3xl border border-[#ECD7D1]">
            <p className="text-[#7A4E4E] mb-4">You have no favorite products yet.</p>
            <Button asChild className="bg-[#A84A52] hover:bg-[#8F3F45] text-white">
              <Link href="/">Discover Collection</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
