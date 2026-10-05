'use client';

import Link from 'next/link';
import {
  Merge,
  Minimize2,
  Scissors,
  Image,
  Images,
  RotateCw,
  Stamp,
  FileOutput,
  FileMinus,
  ShieldCheck,
  FileType,
  FileText,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';

const tools = [
  {
    title: 'Merge PDFs',
    description: 'Combine multiple PDFs into a single document',
    icon: Merge,
    href: '/merge',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    icon: Minimize2,
    href: '/compress',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Split PDF',
    description: 'Extract individual pages from a PDF',
    icon: Scissors,
    href: '/split',
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    title: 'PDF to Images',
    description: 'Convert each PDF page to a PNG image',
    icon: Image,
    href: '/pdf-to-images',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Images to PDF',
    description: 'Combine images into a single PDF document',
    icon: Images,
    href: '/images-to-pdf',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate all pages by 90°, 180°, or 270°',
    icon: RotateCw,
    href: '/rotate',
    color: 'from-yellow-500 to-amber-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Add Watermark',
    description: 'Stamp text across every page of your PDF',
    icon: Stamp,
    href: '/watermark',
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Extract Pages',
    description: 'Pull specific pages out into a new PDF',
    icon: FileOutput,
    href: '/extract',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    title: 'Remove Pages',
    description: 'Delete unwanted pages from a PDF',
    icon: FileMinus,
    href: '/remove-pages',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    title: 'Password Protect',
    description: 'Encrypt and decrypt PDFs with a password',
    icon: ShieldCheck,
    href: '/password',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    title: 'PDF to Text',
    description: 'Extract all text content from a PDF',
    icon: FileType,
    href: '/pdf-to-text',
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
];

const features = [
  {
    icon: Shield,
    title: '100% Private',
    description: 'All processing happens in your browser. Files never leave your device.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'No upload wait times. Process files instantly with WebAssembly.',
  },
  {
    icon: Globe,
    title: 'Free Forever',
    description: 'No limits, no watermarks, no sign-ups. Use it as much as you want.',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Hero */}
      <div className="mb-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <FileText className="h-4 w-4" />
          Your personal PDF toolkit
        </div>
        <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
          PDF <span className="gradient-text">Toolkit</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Merge, compress, split, convert, and rotate PDFs — all from your browser.
          No uploads. No limits. Completely free.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="mb-24 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="glass glass-hover group relative overflow-hidden rounded-2xl p-6"
          >
            <div
              className={`mb-4 inline-flex rounded-xl p-3 ${tool.bg} transition-transform duration-300 group-hover:scale-110`}
            >
              <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
              {tool.title}
            </h3>
            <p className="text-sm text-slate-500">{tool.description}</p>
            <div
              className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br ${tool.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`}
            />
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="text-center">
            <div className="mx-auto mb-4 inline-flex rounded-2xl bg-slate-100 p-4">
              <feature.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">{feature.title}</h3>
            <p className="text-sm text-slate-500">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
        Built with ♥ — All files stay on your device
      </div>
    </main>
  );
}
