'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Lock, Unlock, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileDropzone from '@/components/FileDropzone';
import LoadingButton from '@/components/LoadingButton';
import ResultCard from '@/components/ResultCard';
import { encryptPDF, decryptPDF, PDFResult } from '@/lib/pdf-utils';

type Mode = 'encrypt' | 'decrypt';

export default function PasswordPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>('encrypt');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<PDFResult | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please add a PDF file');
      return;
    }
    if (!password.trim()) {
      toast.error('Please enter a password');
      return;
    }
    if (mode === 'encrypt' && password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res =
        mode === 'encrypt'
          ? await encryptPDF(files[0], password)
          : await decryptPDF(files[0], password);
      setResult(res);
      toast.success(mode === 'encrypt' ? 'PDF encrypted!' : 'PDF decrypted!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('decrypt')) {
        toast.error('Wrong password or invalid encrypted PDF.');
      } else {
        toast.error(msg || 'Failed to process PDF.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Password Protect" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-cyan-50 p-4">
            <ShieldCheck className="h-8 w-8 text-cyan-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">Password Protect</h1>
          <p className="text-slate-500">
            Encrypt or decrypt a PDF with a password
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => { setMode('encrypt'); setResult(null); }}
            className={`flex items-center justify-center gap-2 rounded-xl p-4 font-medium transition-all duration-200 ${
              mode === 'encrypt'
                ? 'bg-cyan-50 border-2 border-cyan-500 text-slate-800 shadow-sm'
                : 'bg-slate-50 border-2 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Lock className="h-5 w-5" />
            Encrypt
          </button>
          <button
            onClick={() => { setMode('decrypt'); setResult(null); }}
            className={`flex items-center justify-center gap-2 rounded-xl p-4 font-medium transition-all duration-200 ${
              mode === 'decrypt'
                ? 'bg-cyan-50 border-2 border-cyan-500 text-slate-800 shadow-sm'
                : 'bg-slate-50 border-2 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Unlock className="h-5 w-5" />
            Decrypt
          </button>
        </div>

        <FileDropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          onFiles={(f) => setFiles(f.slice(0, 1))}
          multiple={false}
          label="Drop your PDF here"
          sublabel={mode === 'encrypt' ? 'It will be password-protected' : 'Enter the password to unlock it'}
        />

        {files.length > 0 && !result && (
          <div className="mt-6 glass rounded-2xl p-6">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              {mode === 'encrypt' ? 'Set Password' : 'Enter Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder={mode === 'encrypt' ? 'Choose a password...' : 'Enter existing password...'}
            />
            {mode === 'encrypt' && (
              <p className="mt-2 text-xs text-slate-400">
                The PDF will require this password to open.
              </p>
            )}
          </div>
        )}

        {result && <div className="mt-6"><ResultCard result={result} /></div>}

        <div className="mt-6">
          <LoadingButton
            onClick={handleProcess}
            loading={loading}
            disabled={files.length === 0 || !password.trim()}
          >
            {mode === 'encrypt' ? 'Encrypt PDF' : 'Decrypt PDF'}
          </LoadingButton>
        </div>
      </main>
    </>
  );
}
