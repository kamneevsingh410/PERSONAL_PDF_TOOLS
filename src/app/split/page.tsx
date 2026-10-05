'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Scissors } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { splitPDF } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function SplitPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSplit = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    setLoading(true);
    try {
      await splitPDF(files[0]);
      toast.success('PDF split into individual pages!');
    } catch {
      toast.error('Failed to split PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Split PDF" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-orange-50 p-4">
            <Scissors className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Split PDF</h1>
          <p className="text-slate-500">
            Extract every page from a PDF as a separate file
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Each page will become a separate PDF"
        />

        <div className="mt-6">
          <LoadingButton
            onClick={handleSplit}
            loading={loading}
            disabled={files.length === 0}
          >
            Split into Pages
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
