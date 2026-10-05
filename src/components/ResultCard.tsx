'use client';

import { ArrowDown, Download, CheckCircle2 } from 'lucide-react';
import { PDFResult, downloadResult, formatBytes } from '@/lib/pdf-utils';

interface ResultCardProps {
  result: PDFResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const saved = result.originalSize - result.resultSize;
  const ratio =
    result.originalSize > 0
      ? ((saved / result.originalSize) * 100).toFixed(1)
      : '0';
  const savedSize = saved > 0;

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <span className="font-semibold text-slate-800">Processing Complete</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Original */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Original</p>
          <p className="text-lg font-bold text-slate-700">
            {formatBytes(result.originalSize)}
          </p>
        </div>

        {/* Arrow + change */}
        <div className="flex flex-col items-center justify-center">
          <ArrowDown className="h-5 w-5 text-slate-300 sm:hidden" />
          <div className="hidden sm:block text-slate-300 text-lg">→</div>
          {savedSize && (
            <span className="mt-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              −{ratio}%
            </span>
          )}
          {!savedSize && (
            <span className="mt-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              +{formatBytes(Math.abs(saved))}
            </span>
          )}
        </div>

        {/* Result */}
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
          <p className="text-xs text-blue-400 mb-1">Result</p>
          <p className="text-lg font-bold text-blue-700">
            {formatBytes(result.resultSize)}
          </p>
        </div>
      </div>

      {/* Filename */}
      <p className="text-sm text-slate-500 text-center truncate">
        {result.filename}
      </p>

      {/* Download button */}
      <button
        onClick={() => downloadResult(result)}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors duration-200 hover:bg-blue-700"
      >
        <Download className="h-5 w-5" />
        Download
      </button>
    </div>
  );
}
