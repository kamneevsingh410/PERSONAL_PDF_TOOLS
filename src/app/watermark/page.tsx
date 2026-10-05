'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Stamp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { addWatermark } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function WatermarkPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);

  const handleWatermark = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    if (!text.trim()) {
      toast.error('Please enter watermark text');
      return;
    }
    setLoading(true);
    try {
      await addWatermark(files[0], text, opacity);
      toast.success('Watermark added successfully!');
    } catch {
      toast.error('Failed to add watermark.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Add Watermark" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-4">
            <Stamp className="h-8 w-8 text-slate-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Add Watermark</h1>
          <p className="text-slate-500">
            Stamp a diagonal text watermark across every page
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="A text watermark will be added to every page"
        />

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-6">
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Watermark Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter watermark text..."
              />
            </div>

            <div className="glass rounded-2xl p-6">
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>Faint</span>
                <span>Bold</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <LoadingButton
            onClick={handleWatermark}
            loading={loading}
            disabled={files.length === 0 || !text.trim()}
          >
            Add Watermark
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
