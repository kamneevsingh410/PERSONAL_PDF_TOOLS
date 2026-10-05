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
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    icon: Minimize2,
    href: '/compress',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Split PDF',
    description: 'Extract individual pages from a PDF',
    icon: Scissors,
    href: '/split',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    title: 'PDF to Images',
    description: 'Convert each PDF page to a PNG image',
    icon: Image,
    href: '/pdf-to-images',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    title: 'Images to PDF',
    description: 'Combine images into a single PDF document',
    icon: Images,
    href: '/images-to-pdf',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate all pages by 90°, 180°, or 270°',
    icon: RotateCw,
    href: '/rotate',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Add Watermark',
    description: 'Stamp text across every page of your PDF',
    icon: Stamp,
    href: '/watermark',
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    title: 'Extract Pages',
    description: 'Pull specific pages out into a new PDF',
    icon: FileOutput,
    href: '/extract',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    title: 'Remove Pages',
    description: 'Delete unwanted pages from a PDF',
    icon: FileMinus,
    href: '/remove-pages',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    title: 'Password Protect',
    description: 'Encrypt and decrypt PDFs with a password',
    icon: ShieldCheck,
    href: '/password',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    title: 'PDF to Text',
    description: 'Extract all text content from a PDF',
    icon: FileType,
    href: '/pdf-to-text',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
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
    description: 'No upload wait times. Files are processed right on your device.',
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
        <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
          Free PDF tools that run in your browser
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Merge, compress, split, convert, watermark, and protect your PDFs.
          No uploads. No sign-up. No limits.
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
    </main>
  );
}
