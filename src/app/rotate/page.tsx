'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { RotateCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import { rotatePDF } from '@/lib/pdf-utils';
import LoadingButton from '@/components/LoadingButton';

export default function RotatePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);

  const handleRotate = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    setLoading(true);
    try {
      await rotatePDF(files[0], angle);
      toast.success(`PDF rotated by ${angle}°!`);
    } catch {
      toast.error('Failed to rotate PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Rotate PDF" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-amber-50 p-4">
            <RotateCw className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Rotate PDF</h1>
          <p className="text-slate-500">
            Rotate all pages in your PDF by any angle
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="All pages will be rotated by the same angle"
        />

        {files.length > 0 && (
          <div className="mt-6 glass rounded-2xl p-6">
            <p className="mb-3 text-sm font-medium text-slate-600">Rotation Angle</p>
            <div className="grid grid-cols-3 gap-3">
              {([90, 180, 270] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`flex items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 ${
                    angle === a
                      ? 'bg-amber-50 border-2 border-amber-500 text-slate-800 shadow-sm'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <RotateCw
                    className="h-5 w-5 transition-transform duration-300"
                    style={{ transform: `rotate(${a}deg)` }}
                  />
                  <span className="font-medium">{a}°</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <LoadingButton
            onClick={handleRotate}
            loading={loading}
            disabled={files.length === 0}
          >
            Rotate PDF {angle}°
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
