'use client';

import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
}

export default function Navbar({ title, showBack = false }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        {showBack && (
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 p-2 shadow-md shadow-blue-500/10">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">
            {title || 'PDF Toolkit'}
          </span>
        </Link>
      </div>
    </nav>
  );
}
