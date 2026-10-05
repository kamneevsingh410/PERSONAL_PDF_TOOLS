'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FileType, Copy, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import LoadingButton from '@/components/LoadingButton';
import { pdfToText } from '@/lib/pdf-utils';

export default function PdfToTextPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    setLoading(true);
    setText(null);
    try {
      const extracted = await pdfToText(files[0]);
      setText(extracted);
      toast.success('Text extracted!');
    } catch {
      toast.error('Failed to extract text. The PDF may contain only images.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    }
  };

  const handleDownloadTxt = () => {
    if (text) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${files[0]?.name.replace(/\.pdf$/i, '')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Downloaded!');
    }
  };

  return (
    <>
      <Navbar title="PDF to Text" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-cyan-50 p-4">
            <FileType className="h-8 w-8 text-cyan-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">PDF to Text</h1>
          <p className="text-slate-500">
            Extract all text content from a PDF document
          </p>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel="Text will be extracted from every page"
        />

        {text && (
          <div className="mt-6 glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Extracted Text ({text.length.toLocaleString()} characters)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  .txt
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={text}
              className="w-full h-64 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 font-mono resize-y outline-none"
            />
          </div>
        )}

        <div className="mt-6">
          <LoadingButton
            onClick={handleConvert}
            loading={loading}
            disabled={files.length === 0}
          >
            Extract Text
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
