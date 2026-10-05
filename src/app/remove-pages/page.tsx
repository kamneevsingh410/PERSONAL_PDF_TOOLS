'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FileMinus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import LoadingButton from '@/components/LoadingButton';
import ResultCard from '@/components/ResultCard';
import { removePages, PDFResult } from '@/lib/pdf-utils';

export default function RemovePagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState('');
  const [result, setResult] = useState<PDFResult | null>(null);

  const handleRemove = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    if (!range.trim()) {
      toast.error('Enter page ranges to remove, e.g. 2,4-6');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await removePages(files[0], range);
      setResult(res);
      toast.success('Pages removed!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove pages.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Remove Pages" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-red-50 p-4">
            <FileMinus className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Remove Pages</h1>
          <p className="text-slate-500">
            Delete unwanted pages from a PDF document
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Then enter which pages to delete"
        />

        {files.length > 0 && !result && (
          <div className="mt-6 glass rounded-2xl p-6">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Pages to Remove
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="e.g. 2,4-6"
            />
            <p className="mt-2 text-xs text-slate-400">
              Comma-separated pages and ranges to delete.
            </p>
          </div>
        )}

        {result && <div className="mt-6"><ResultCard result={result} /></div>}

        <div className="mt-6">
          <LoadingButton
            onClick={handleRemove}
            loading={loading}
            disabled={files.length === 0 || !range.trim()}
          >
            Remove Pages
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
