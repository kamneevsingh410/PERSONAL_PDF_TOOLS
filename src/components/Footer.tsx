import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:justify-between">
        <p>All files stay on your device.</p>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="transition-colors hover:text-slate-700">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-slate-700">
            Privacy Policy
          </Link>
          <span>{new Date().getFullYear()} PDF Toolkit</span>
        </div>
      </div>
    </footer>
  );
}
