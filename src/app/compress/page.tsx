'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Minimize2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import LoadingButton from '@/components/LoadingButton';
import ResultCard from '@/components/ResultCard';
import { compressPDF, formatBytes, PDFResult } from '@/lib/pdf-utils';

type Quality = 'low' | 'medium' | 'high';

export default function CompressPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState<Quality>('medium');
  const [result, setResult] = useState<PDFResult | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await compressPDF(files[0], quality);
      setResult(res);
      const ratio = ((res.originalSize - res.resultSize) / res.originalSize * 100).toFixed(1);
      if (parseFloat(ratio) > 0) {
        toast.success(`Compressed by ${ratio}%!`);
      } else {
        toast.success('PDF is already optimized!');
      }
    } catch {
      toast.error('Failed to compress PDF.');
    } finally {
      setLoading(false);
    }
  };

  const qualityOptions: { value: Quality; label: string; desc: string }[] = [
    { value: 'high', label: 'High Quality', desc: 'Smallest size reduction' },
    { value: 'medium', label: 'Balanced', desc: 'Good balance' },
    { value: 'low', label: 'Maximum', desc: 'Smallest file size' },
  ];

  return (
    <>
      <Navbar title="Compress PDF" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-4">
            <Minimize2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Compress PDF</h1>
          <p className="text-slate-500">
            Reduce PDF file size while maintaining readability
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={setFiles}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Select a PDF to compress"
        />

        {files.length > 0 && !result && (
          <div className="mt-6 glass rounded-2xl p-6">
            <p className="mb-3 text-sm font-medium text-slate-600">Compression Level</p>
            <div className="grid grid-cols-3 gap-3">
              {qualityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQuality(opt.value)}
                  className={`rounded-xl p-3 text-center transition-all duration-200 ${
                    quality === opt.value
                      ? 'bg-blue-50 border-2 border-blue-500 text-slate-800 shadow-sm'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="mt-1 text-xs text-slate-400">{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-3 text-center text-sm text-slate-400">
              Original size: {formatBytes(files[0].size)}
            </div>
          </div>
        )}

        {result && <div className="mt-6"><ResultCard result={result} /></div>}

        <div className="mt-6">
          <LoadingButton
            onClick={handleCompress}
            loading={loading}
            disabled={files.length === 0}
          >
            {result ? 'Compress Again' : 'Compress PDF'}
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
