import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PDF Toolkit | Free PDF tools that run in your browser',
  description:
    'Merge, compress, split, convert, and rotate PDFs in your browser. No uploads, completely free.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#1e293b',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            },
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
