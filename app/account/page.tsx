"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext, useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function AccountPage() {
  const router = useRouter();
  const auth = useContext(AuthContext) || useAuth();
  const { user, loading, signOut } = auth;

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FBF4EE] via-[#F8EDE9] to-[#F1E4DE] text-[#3F2A2A]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#DFBFB9] border-t-[#C97980] rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#7A4E4E]">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FBF4EE] via-[#F8EDE9] to-[#F1E4DE] text-[#3F2A2A] selection:bg-[#EAA5AB]/30">
      {/* ── Soft Ambient Decorative Background Orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      >
        <div className="absolute -top-32 -left-28 w-[34rem] h-[34rem] rounded-full bg-[#EAA5AB]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#F5C7B8]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-[#E0BFD5]/20 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <Header />

      {/* ── Account Content ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Main Card with data-testid="account-page" */}
        <div
          data-testid="account-page"
          className="bg-[#FFFDFB]/95 backdrop-blur-xl border border-[#ECD7D1] rounded-3xl shadow-[0_20px_50px_rgba(183,122,125,0.12)] p-6 sm:p-10"
        >
          {/* Top Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#F0DDD9]">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shadow-md shadow-[#C97980]/30 shrink-0">
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF0EC] border border-[#ECD7D1] text-[#9E454D] text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BA6770]" />
                  Active Member
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#3F2A2A] font-serif">
                  My Atelier Account
                </h1>
                <p className="text-xs sm:text-sm text-[#7A4E4E]/80">
                  Manage your personal capsule and session details
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="rounded-xl border-[#DFBFB9] hover:bg-[#FDF4F1] hover:border-[#C4757C] text-xs sm:text-sm font-semibold self-start sm:self-center shadow-xs"
            >
              Sign Out
            </Button>
          </div>

          {/* Account Details Section */}
          <div className="pt-8 space-y-6">
            <h2 className="text-base font-bold text-[#3F2A2A] font-serif uppercase tracking-wider text-xs text-[#8A5A5D]">
              Security &amp; Account Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card with data-testid="account-email" */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4F0]/80 border border-[#ECD7D1]/70">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A5D] block mb-1">
                  Email Address
                </span>
                <span
                  data-testid="account-email"
                  className="text-sm sm:text-base font-bold text-[#3F2A2A] break-all block"
                >
                  {user.email}
                </span>
              </div>

              {/* User ID Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4F0]/80 border border-[#ECD7D1]/70">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A5D] block mb-1">
                  User ID (Supabase Auth)
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#5C3A3D] break-all block">
                  {user.id}
                </span>
              </div>

              {/* Account Created At */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4F0]/80 border border-[#ECD7D1]/70">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A5D] block mb-1">
                  Member Since
                </span>
                <span className="text-sm font-medium text-[#3F2A2A] block">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Active Session"}
                </span>
              </div>

              {/* Account Status */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4F0]/80 border border-[#ECD7D1]/70">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A5D] block mb-1">
                  Session Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-800">
                    Authenticated &amp; Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="rounded-xl shadow-md shadow-[#BE6B72]/20 text-xs sm:text-sm"
              >
                <Link href="/">Browse Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-[#DFBFB9] hover:bg-[#FDF4F1] text-xs sm:text-sm"
              >
                <Link href="/#artisanal-values">Artisanal Values</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
