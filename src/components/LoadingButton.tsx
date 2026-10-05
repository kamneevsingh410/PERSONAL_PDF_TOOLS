'use client';

import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({
  onClick,
  loading = false,
  disabled = false,
  children,
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
