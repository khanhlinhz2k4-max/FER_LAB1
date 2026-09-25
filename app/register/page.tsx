"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState(false);

  const validateName = (val: string): string | undefined => {
    if (!val.trim()) {
      return "Full name is required";
    }
    return undefined;
  };

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
    if (val.length < 6) {
      return "Password must be at least 6 characters";
    }
    return undefined;
  };

  const validateConfirmPassword = (
    val: string,
    currentPassword = password
  ): string | undefined => {
    if (!val) {
      return "Confirm password is required";
    }
    if (val !== currentPassword) {
      return "Passwords do not match";
    }
    return undefined;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name) {
      const err = validateName(val);
      if (!err) {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    }
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
    // Also re-validate confirm password if it already has an error
    if (errors.confirmPassword && confirmPassword) {
      const confirmErr = validateConfirmPassword(confirmPassword, val);
      if (!confirmErr) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (errors.confirmPassword) {
      const err = validateConfirmPassword(val, password);
      if (!err) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword, password);

    if (nameErr || emailErr || passwordErr || confirmPasswordErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr,
      });
      return;
    }

    setErrors({});
    setSuccess(true);
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

      {/* ── Centered Register Card ── */}
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="bg-[#FFFDFB]/95 backdrop-blur-2xl border border-[#ECD7D1] rounded-3xl shadow-[0_25px_60px_rgba(183,122,125,0.15)] p-7 sm:p-10 transition-all">
          {/* Header Section */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#D4898E] via-[#C97980] to-[#E29A98] text-white shadow-md shadow-[#C97980]/30 mb-3 hover:scale-105 hover:shadow-lg hover:shadow-[#C97980]/40 transition-all"
              title="Return to Home"
            >
              <span className="font-serif font-bold text-xl tracking-tighter">
                AR
              </span>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0EC] border border-[#ECD7D1]/70 text-[#9E454D] text-[10px] font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA6770]" />
              Exclusive Membership
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F2A2A] tracking-tight font-serif">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-[#7A4E4E]/80 mt-1.5 font-normal">
              Join the Atelier Society to discover curated luxury pastel garments
            </p>
          </div>

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
              <span>Registration successful (demo)</span>
            </div>
          )}

          {/* Register Form */}
          <form
            data-testid="register-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3.5"
          >
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1"
              >
                Full Name
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
                  id="register-name"
                  name="name"
                  type="text"
                  data-testid="register-name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.name && (
                <p
                  data-testid="error-name"
                  className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1"
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
                  id="register-email"
                  name="email"
                  type="email"
                  data-testid="register-email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p
                  data-testid="error-email"
                  className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* 3. Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1"
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
                  id="register-password"
                  name="password"
                  type="password"
                  data-testid="register-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* 4. Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs sm:text-sm font-semibold text-[#4A3030] mb-1"
              >
                Confirm Password
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  data-testid="register-confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-[#DFBFB9] bg-white/95 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3F2A2A] placeholder-[#B59C97] focus:outline-none focus:border-[#C4757C] focus:ring-3 focus:ring-[#C4757C]/20 transition-all duration-200"
                />
              </div>
              {errors.confirmPassword && (
                <p
                  data-testid="error-confirm-password"
                  className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                data-testid="register-submit"
                className="w-full h-11 text-sm font-semibold rounded-xl shadow-md shadow-[#BE6B72]/25 hover:shadow-lg"
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Footer: Login Link & Home Link */}
          <div className="mt-7 pt-4 border-t border-[#F0DDD9] flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-[#7A4E4E]/85">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#AA5158] hover:text-[#C4676F] hover:underline transition-colors"
              >
                Sign in here
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
