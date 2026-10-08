"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

type Action = 
  | { type: "SET"; payload: number[] }
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

function favoritesReducer(state: number[], action: Action): number[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const { data, error } = await supabase
          .from("favorites")
          .select("product_id")
          // RLS ensures we only get our own favorites
          
        if (!error && data) {
          const ids = data.map((row: any) => row.product_id);
          dispatch({ type: "SET", payload: ids });
        }
      };
      fetchFavorites();
    } else {
      dispatch({ type: "SET", payload: [] });
    }
  }, [user]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = async (id: number) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const currentlyFavorite = isFavorite(id);

    // Optimistic Update
    if (currentlyFavorite) {
      dispatch({ type: "REMOVE", payload: id });
    } else {
      dispatch({ type: "ADD", payload: id });
    }

    // Call Supabase
    if (currentlyFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("product_id", id)
        .eq("user_id", user.id); // Although RLS helps, good practice to specify
        
      if (error) {
        // Rollback
        dispatch({ type: "ADD", payload: id });
        console.error("Failed to remove favorite", error);
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert([{ product_id: id }]); // user_id is set by default or RLS
        
      if (error) {
        // Rollback
        dispatch({ type: "REMOVE", payload: id });
        console.error("Failed to add favorite", error);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
