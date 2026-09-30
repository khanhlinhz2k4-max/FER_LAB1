"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) {
      return "Email is required";
    }
    if (!EMAIL_REGEX.test(val.trim())) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val) {
      return "Password is required";
    }
    return undefined;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      const err = validateEmail(val);
      if (!err) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) {
      const err = validatePassword(val);
      if (!err) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setAuthError(null);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({
        email: emailErr,
        password: passwordErr,
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccess(true);
        router.push("/");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to sign in. Please try again.";
      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#FBF4EE] via-[#F8EDE9] to-[#F1E4DE] text-[#3F2A2A] overflow-hidden selection:bg-[#EAA5AB]/30">
      {/* ── Soft Ambient Background Orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#EAA5AB]/30 blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-96 h-96 rounded-full bg-[#F5C7B8]/35 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#E0BFD5]/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#E5BDB0]/25 blur-3xl" />
      </div>

      {/* ── Centered Login Card ── */}
      <div className="relative z-10 w-full max-w-[460px]">
        <div className="bg-[#FFFDFB]/95 backdrop-blur-2xl border border-[#ECD7D1] rounded-3xl shadow-[0_25px_60px_rgba(183,122,125,0.15)] p-7 sm:p-10 transition-all">
          {/* Header Section */}
          <div className="text-center mb-7">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white shadow-md shadow-[#C97980]/30 mb-3.5 hover:scale-105 hover:shadow-lg hover:shadow-[#C97980]/40 transition-all"
              title="Return to Home"
            >
              <span className="font-serif font-bold text-xl tracking-tighter">
                AR
              </span>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0EC] border border-[#ECD7D1]/70 text-[#9E454D] text-[10px] font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA6770]" />
              Member Sanctuary
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F2A2A] tracking-tight font-serif">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#7A4E4E]/80 mt-1.5 font-normal">
              Sign in with your email and password to access your curated capsule
            </p>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div
              data-testid="error-auth"
              role="alert"
              className="mb-5 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3.5 text-xs sm:text-sm text-red-700 font-medium flex items-center gap-2.5 shadow-xs"
            >
              <svg
                className="w-4 h-4 text-red-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{authError}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div
              data-testid="form-success"
              role="alert"
              className="mb-5 rounded-2xl border border-[#B8D8BA] bg-gradient-to-r from-[#EAF5EB] to-[#F1F9F2] px-4 py-3.5 text-xs sm:text-sm text-[#2E6034] font-medium flex items-center gap-2.5 shadow-xs"
            >
              <svg
                className="w-4 h-4 text-[#3C8D46] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Login successful! Redirecting to home...</span>
            </div>
          )}

          {/* Login Form */}
          <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* 1. Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#B58688]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="login-email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p
                  data-testid="error-email"
                  className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* 2. Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#B58688]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="login-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* 3. Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="login-submit"
                className="w-full h-11 text-sm font-semibold rounded-xl shadow-md shadow-[#BE6B72]/25 hover:shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>

          {/* Footer: Register Link & Home Link */}
          <div className="mt-7 pt-4 border-t border-[#F0DDD9] flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-[#7A4E4E]/85">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#AA5158] hover:text-[#C4676F] hover:underline transition-colors"
              >
                Register here
              </Link>
            </p>
            <Link
              href="/"
              className="text-xs text-[#8A5A5D] hover:text-[#5C3236] hover:underline transition-colors mt-1"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
