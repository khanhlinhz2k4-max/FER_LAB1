"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4" data-testid="error-boundary">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <Button data-testid="btn-retry" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
