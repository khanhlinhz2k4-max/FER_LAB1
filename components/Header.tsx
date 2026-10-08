"use client";

import { useContext } from "react";
import Link from "next/link";
import { AuthContext, useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const auth = useContext(AuthContext) || useAuth();
  const { user, loading, signOut } = auth;
  
  // We can safely call useFavorites, but it might throw if not wrapped in provider (it is wrapped in layout now)
  const favoritesContext = useFavorites();
  const favoritesCount = favoritesContext?.favorites?.length || 0;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FFFDFB]/85 border-b border-[#ECD7D1]/70 transition-all shadow-[0_4px_20px_rgba(183,122,125,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white flex items-center justify-center shadow-md shadow-[#C97980]/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#C97980]/35 transition-all">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tighter">
              AR
            </span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#3F2A2A] block leading-none font-serif">
              ATELIER ROSE
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8A5A5D] font-medium block mt-1">
              Haute Couture &amp; Silks
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#6C4246]">
          <Link
            href="/#collection-heading"
            className="hover:text-[#A84A52] transition-colors"
          >
            Collection
          </Link>
          <Link
            href="/#artisanal-values"
            className="hover:text-[#A84A52] transition-colors"
          >
            Artisanal Values
          </Link>
          <Link
            href="/#editorial-quote"
            className="hover:text-[#A84A52] transition-colors"
          >
            Lookbook
          </Link>
          {user && (
            <Link
              href="/account"
              className="hover:text-[#A84A52] transition-colors"
            >
              Account
            </Link>
          )}
        </nav>

        {/* Auth-aware Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {loading ? (
            <div className="h-9 w-32 bg-[#F3E5E1] animate-pulse rounded-xl" />
          ) : user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Luxury Member Profile Chip */}
              <Link
                href="/account"
                data-testid="user-email"
                className="group flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full bg-white/80 hover:bg-[#FDF4F1] border border-[#ECD7D1] shadow-[0_2px_8px_rgba(183,122,125,0.06)] hover:border-[#D4898E] transition-all max-w-[210px] sm:max-w-[280px]"
                title={`Go to Account: ${user.email || ""}`}
              >
                {/* Mini Initial Avatar Orb */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white flex items-center justify-center text-xs font-serif font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  {user.email ? user.email.charAt(0).toUpperCase() : "A"}
                </div>
                {/* Email text */}
                <span className="text-xs font-medium text-[#5C3236] group-hover:text-[#A84A52] truncate tracking-tight transition-colors">
                  {user.email}
                </span>
              </Link>

              <Link 
                href="/favorites" 
                data-testid="link-favorites"
                className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-white/80 hover:bg-[#FDF4F1] border border-[#ECD7D1] hover:border-[#D4898E] text-[#9A676B] hover:text-[#C45E67] text-xs font-semibold transition-all shadow-[0_2px_8px_rgba(183,122,125,0.06)]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span data-testid="favorites-count">{favoritesCount}</span>
              </Link>

              {/* Refined Sign Out Button */}
              <Button
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={() => signOut()}
                className="rounded-full border-[#DFBFB9] hover:bg-[#FDF4F1] hover:border-[#C4757C] hover:text-[#943F46] text-xs font-semibold text-[#7A4E4E] px-3.5 h-8 shadow-2xs transition-all"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl border-[#DFBFB9] hover:bg-[#FDF4F1] hover:border-[#C4757C] text-xs sm:text-sm font-semibold shadow-xs"
              >
                <Link href="/login" data-testid="btn-login">
                  Sign In
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#BE6B72]/20"
              >
                <Link href="/register" data-testid="btn-register">
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
