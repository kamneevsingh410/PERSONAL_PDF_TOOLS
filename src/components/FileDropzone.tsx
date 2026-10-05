'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';

interface FileDropzoneProps {
  accept: Record<string, string[]>;
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
}

export default function FileDropzone({
  accept,
  onFiles,
  multiple = true,
  label = 'Drop your files here',
  sublabel = 'or click to browse',
}: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => {
        const updated = multiple ? [...prev, ...acceptedFiles] : acceptedFiles;
        onFiles(updated);
        return updated;
      });
    },
    [onFiles, multiple],
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFiles(updated);
      return updated;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg shadow-blue-500/10'
            : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div
            className={`rounded-2xl p-4 transition-all duration-300 ${
              isDragActive ? 'bg-blue-100' : 'bg-slate-100'
            }`}
          >
            <Upload
              className={`h-8 w-8 transition-colors ${
                isDragActive ? 'text-blue-500' : 'text-slate-400'
              }`}
            />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-700">{label}</p>
            <p className="mt-1 text-sm text-slate-400">{sublabel}</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="glass flex items-center gap-3 rounded-xl px-4 py-3"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              <File className="h-5 w-5 shrink-0 text-slate-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="rounded-lg p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
