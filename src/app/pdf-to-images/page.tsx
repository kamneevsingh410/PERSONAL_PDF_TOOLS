'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Image } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { pdfToImages } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function PdfToImagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    setLoading(true);
    try {
      await pdfToImages(files[0]);
      toast.success('PDF converted to images!');
    } catch {
      toast.error('Failed to convert PDF to images.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="PDF to Images" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-purple-50 p-4">
            <Image className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">PDF to Images</h1>
          <p className="text-slate-500">
            Convert each page of a PDF to a high-resolution PNG image
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Each page will be saved as a PNG image"
        />

        <div className="mt-6">
          <LoadingButton
            onClick={handleConvert}
            loading={loading}
            disabled={files.length === 0}
          >
            Convert to Images
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
