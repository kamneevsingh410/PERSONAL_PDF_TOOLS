import { PDFDocument, degrees, rgb } from 'pdf-lib-with-encrypt';
import { saveAs } from 'file-saver';

/** Read a File into an ArrayBuffer */
export async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

/** Result of a PDF operation that produces a file */
export interface PDFResult {
  bytes: Uint8Array;
  filename: string;
  originalSize: number;
  resultSize: number;
}

/** Convert a PDFResult into a downloadable file */
export function downloadResult(result: PDFResult) {
  downloadBlob(result.bytes, result.filename, 'application/pdf');
}

// ─── Existing tools (auto-download) ─────────────────────────────────────

/** Merge multiple PDF files into one */
export async function mergePDFs(files: File[]): Promise<void> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(bytes);
    const copiedPages = await merged.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => merged.addPage(page));
  }
  const pdfBytes = await merged.save();
  downloadBlob(pdfBytes, 'merged.pdf', 'application/pdf');
}

/** Split a PDF into individual pages */
export async function splitPDF(file: File): Promise<void> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  const pageCount = pdf.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    downloadBlob(pdfBytes, `page-${i + 1}.pdf`, 'application/pdf');
  }
}

/** Rotate all pages in a PDF (auto-download) */
export async function rotatePDF(file: File, angle: 90 | 180 | 270): Promise<void> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  const pages = pdf.getPages();
  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + angle));
  });
  const pdfBytes = await pdf.save();
  downloadBlob(pdfBytes, `rotated-${file.name}`, 'application/pdf');
}

/** Add watermark to every page (auto-download) */
export async function addWatermark(file: File, text: string, opacity: number = 0.3): Promise<void> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  const pages = pdf.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    const fontSize = 48;
    const textWidth = text.length * fontSize * 0.6;
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: height / 2,
      size: fontSize,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(-45),
    });
  }
  const pdfBytes = await pdf.save();
  downloadBlob(pdfBytes, `watermarked-${file.name}`, 'application/pdf');
}

/** Convert images to a PDF (auto-download) */
export async function imagesToPDF(files: File[]): Promise<void> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await readFileAsArrayBuffer(file);
    let image;
    if (file.type === 'image/png') {
      image = await merged.embedPng(bytes);
    } else if (
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.name.toLowerCase().endsWith('.jpg') ||
      file.name.toLowerCase().endsWith('.jpeg')
    ) {
      image = await merged.embedJpg(bytes);
    } else {
      throw new Error(`Unsupported image type: ${file.type}. Use JPG or PNG.`);
    }
    const page = merged.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  const pdfBytes = await merged.save();
  downloadBlob(pdfBytes, 'images.pdf', 'application/pdf');
}

/** Convert PDF pages to images using pdfjs-dist (local worker) */
export async function pdfToImages(file: File): Promise<void> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    await new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `page-${i}.png`);
        resolve();
      }, 'image/png');
    });
  }
}

// ─── New tools (return PDFResult for ResultCard display) ────────────────

/** Compress PDF — returns result for display */
export async function compressPDF(
  file: File,
  quality: 'low' | 'medium' | 'high' = 'medium',
): Promise<PDFResult> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('');
  pdf.setCreator('');

  const pdfBytes = await pdf.save({
    useObjectStreams: quality !== 'low',
    addDefaultPage: false,
    objectsPerTick: quality === 'low' ? 50 : quality === 'medium' ? 100 : 200,
  });

  return {
    bytes: pdfBytes,
    filename: `compressed-${file.name}`,
    originalSize: file.size,
    resultSize: pdfBytes.length,
  };
}

/** Extract specific pages by 1-based range string like "1-3,5,7-10" */
export async function extractPages(file: File, rangeStr: string): Promise<PDFResult> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  const totalPages = pdf.getPageCount();
  const indices = parsePageRange(rangeStr, totalPages);

  if (indices.length === 0) {
    throw new Error('No valid pages selected.');
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, indices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return {
    bytes: pdfBytes,
    filename: `extracted-${file.name}`,
    originalSize: file.size,
    resultSize: pdfBytes.length,
  };
}

/** Remove specific pages by 1-based range string */
export async function removePages(file: File, rangeStr: string): Promise<PDFResult> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  const totalPages = pdf.getPageCount();
  const removeSet = new Set(parsePageRange(rangeStr, totalPages));

  if (removeSet.size === 0) {
    throw new Error('No valid pages to remove.');
  }
  if (removeSet.size >= totalPages) {
    throw new Error('Cannot remove all pages.');
  }

  const keepIndices = Array.from({ length: totalPages }, (_, i) => i).filter(
    (i) => !removeSet.has(i),
  );

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, keepIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return {
    bytes: pdfBytes,
    filename: `removed-${file.name}`,
    originalSize: file.size,
    resultSize: pdfBytes.length,
  };
}

/** Encrypt a PDF with a password */
export async function encryptPDF(file: File, password: string): Promise<PDFResult> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes);
  // Encryption must be set up via pdf.encrypt() BEFORE save().
  // save({ encryption }) is ignored by this library and produces an
  // unprotected file that opens without any password.
  await pdf.encrypt({
    userPassword: password,
    ownerPassword: password,
    permissions: {
      printing: false,
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: false,
      documentAssembly: false,
    },
  });
  const pdfBytes = await pdf.save();

  return {
    bytes: pdfBytes,
    filename: `locked-${file.name}`,
    originalSize: file.size,
    resultSize: pdfBytes.length,
  };
}

/** Decrypt a password-protected PDF */
export async function decryptPDF(file: File, password: string): Promise<PDFResult> {
  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(bytes, { password });
  const pdfBytes = await pdf.save();

  return {
    bytes: pdfBytes,
    filename: `unlocked-${file.name}`,
    originalSize: file.size,
    resultSize: pdfBytes.length,
  };
}

/** Extract all text content from a PDF */
export async function pdfToText(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  const bytes = await readFileAsArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    textParts.push(`--- Page ${i} ---\n${pageText}`);
  }

  return textParts.join('\n\n');
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/**
 * Parse a page range string like "1-3,5,7-10" into 0-based indices.
 * Returns sorted unique indices.
 */
export function parsePageRange(rangeStr: string, totalPages: number): number[] {
  const indices = new Set<number>();
  const parts = rangeStr.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      const lo = Math.max(1, Math.min(start, end));
      const hi = Math.min(totalPages, Math.max(start, end));
      for (let i = lo; i <= hi; i++) indices.add(i - 1);
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        indices.add(num - 1);
      }
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}

/** Download bytes as a file */
function downloadBlob(bytes: Uint8Array, filename: string, mimeType: string) {
  const arrayBuffer = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: mimeType });
  saveAs(blob, filename);
}

/** Format bytes to human readable */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
