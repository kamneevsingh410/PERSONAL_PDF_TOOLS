'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FileOutput } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import LoadingButton from '@/components/LoadingButton';
import ResultCard from '@/components/ResultCard';
import { extractPages, PDFResult } from '@/lib/pdf-utils';

export default function ExtractPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState('');
  const [result, setResult] = useState<PDFResult | null>(null);

  const handleExtract = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    if (!range.trim()) {
      toast.error('Enter page ranges, e.g. 1-3,5,7-10');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await extractPages(files[0], range);
      setResult(res);
      toast.success('Pages extracted!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to extract pages.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Extract Pages" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-teal-50 p-4">
            <FileOutput className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Extract Pages</h1>
          <p className="text-slate-500">
            Pull specific pages out of a PDF into a new file
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Then enter which pages you want"
        />

        {files.length > 0 && !result && (
          <div className="mt-6 glass rounded-2xl p-6">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Page Ranges
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
              placeholder="e.g. 1-3,5,7-10"
            />
            <p className="mt-2 text-xs text-slate-400">
              Comma-separated pages and ranges. Use spaces freely.
            </p>
          </div>
        )}

        {result && <div className="mt-6"><ResultCard result={result} /></div>}

        <div className="mt-6">
          <LoadingButton
            onClick={handleExtract}
            loading={loading}
            disabled={files.length === 0 || !range.trim()}
          >
            Extract Pages
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
