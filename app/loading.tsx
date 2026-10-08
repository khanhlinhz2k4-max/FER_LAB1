import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center" data-testid="loading">
      <div className="text-xl font-semibold animate-pulse">Loading...</div>
    </div>
  );
}
