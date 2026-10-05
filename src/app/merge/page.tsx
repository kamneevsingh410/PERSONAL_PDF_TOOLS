'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Merge } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { mergePDFs } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please add at least 2 PDF files');
      return;
    }
    setLoading(true);
    try {
      await mergePDFs(files);
      toast.success('PDFs merged successfully!');
    } catch {
      toast.error('Failed to merge PDFs. Make sure they are valid PDF files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Merge PDFs" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-4">
            <Merge className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Merge PDFs</h1>
          <p className="text-slate-500">
            Combine multiple PDF files into a single document
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={setFiles}
          multiple={true}
          label="Drop your PDFs here"
          sublabel="Select 2 or more PDF files to merge"
        />

        <div className="mt-6">
          <LoadingButton
            onClick={handleMerge}
            loading={loading}
            disabled={files.length < 2}
          >
            Merge {files.length} PDF{files.length !== 1 ? 's' : ''}
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
