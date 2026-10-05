'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Images } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { imagesToPDF } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function ImagesToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    setLoading(true);
    try {
      await imagesToPDF(files);
      toast.success('Images converted to PDF!');
    } catch {
      toast.error('Failed to convert images. Use JPG or PNG files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Images to PDF" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-pink-50 p-4">
            <Images className="h-8 w-8 text-pink-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Images to PDF</h1>
          <p className="text-slate-500">
            Combine JPG and PNG images into a single PDF document
          </p>
        </div>

        <FileDropzone
          accept={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
          }}
          onFiles={setFiles}
          multiple={true}
          label="Drop your images here"
          sublabel="Supports JPG and PNG files"
        />

        <div className="mt-6">
          <LoadingButton
            onClick={handleConvert}
            loading={loading}
            disabled={files.length === 0}
          >
            Create PDF from {files.length} Image{files.length !== 1 ? 's' : ''}
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
