"use client";

import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI-only demo interaction (no database or backend logic)
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#FBF4EE] via-[#F7ECE8] to-[#EFE2DC] text-[#3F2A2A] overflow-hidden">
      {/* ── Rich Pastel Aurora Decorative Background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Soft dusty rose glow */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#EAA5AB]/40 blur-3xl" />
        {/* Warm peach blush glow */}
        <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-[#F5C7B8]/45 blur-3xl" />
        {/* Soft lavender-rose tint */}
        <div className="absolute -bottom-24 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#E0BFD5]/40 blur-3xl" />
        {/* Warm mocha & amber accent */}
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#E5BDB0]/35 blur-3xl" />
      </div>

      {/* ── Centered Login Card ── */}
      <div className="relative z-10 w-full max-w-[460px]">
        {/* Card Container with subtle warm border & layered soft shadow */}
        <div className="bg-[#FFFDFB]/90 backdrop-blur-xl border border-[#ECD7D1] rounded-3xl shadow-[0_20px_50px_rgba(183,122,125,0.12)] p-7 sm:p-9 transition-all">
          {/* Header Section */}
          <div className="text-center mb-7">
            {/* Colorful subtle brand emblem */}
            <div className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white shadow-md shadow-[#C97980]/30 mb-3.5">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#3F2A2A] tracking-tight">
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#7A4E4E]/80 mt-1 font-normal">
              Please sign in to continue to your account
            </p>
          </div>

          {/* Submission Feedback Banner (UI Only) */}
          {submitted && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-[#DCAFA9] bg-gradient-to-r from-[#FBECE9] to-[#F7E1DC] px-4 py-3 text-xs text-[#6F3A3E] flex items-center gap-2.5 shadow-xs animate-fadeIn"
            >
              <svg
                className="w-4 h-4 text-[#BA6F75] shrink-0"
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
              <div>
                <p className="font-semibold">Sign in form submitted</p>
                <p className="text-[11px] text-[#7A4E4E]/85 mt-0.5">
                  UI-only demo for Lab 1. No authentication or backend call executed.
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1.5"
              >
                Email Address
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
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 sm:py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* 2. Username Field (Tách riêng biệt theo yêu cầu) */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1.5"
              >
                Username
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. alex_rose"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 sm:py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* 3. Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-semibold text-[#4A3030]"
                >
                  Password
                </label>
                <a
                  href="#forgot-password"
                  className="text-xs text-[#8A4F53] hover:text-[#B75860] hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>
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
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-11 py-2.5 sm:py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#AA8E89] hover:text-[#7A4E4E] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#DFBFB9] text-[#C2737A] focus:ring-[#C2737A]/30 accent-[#C2737A] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-[#6C4242]">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            {/* 4. Login Button (Rich dusty rose gradient) */}
            <button
              type="submit"
              id="login-button"
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#CE7D83] via-[#BE6B72] to-[#A3535B] hover:from-[#D8868C] hover:via-[#C8737A] hover:to-[#B05B63] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#BE6B72]/30 hover:shadow-lg hover:shadow-[#BE6B72]/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-3 focus:ring-[#BE6B72]/40"
            >
              Sign In
            </button>
          </form>

          {/* 5. Divider with subtle pastel lines */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8CECA]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#FFFDFB] px-3 text-[#9A7470] font-medium tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          {/* 6. Continue with Google Button */}
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-xl border border-[#DFBFB9] bg-white hover:bg-[#FDF4F1] active:bg-[#F8E7E3] text-[#4A3030] font-medium text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus:ring-3 focus:ring-[#DFBFB9]/40"
          >
            {/* Authentic Google 4-Color SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* 7. Footer: Sign up prompt */}
          <div className="mt-6 pt-4 border-t border-[#F0DDD9] text-center">
            <p className="text-xs text-[#7A4E4E]/80">
              Don&apos;t have an account?{" "}
              <a
                href="#signup"
                className="font-semibold text-[#AA5158] hover:text-[#C4676F] hover:underline transition-colors ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
