# PDF Toolkit

> Your personal, privacy-first PDF toolkit. All processing happens **entirely in your browser**: files never leave your device.

**Built by KS** for daily, personal use.

## Live Demo

> **https://YOUR-DEPLOYED-LINK.vercel.app**

[![Deployed](https://img.shields.io/badge/live-demo-blue?style=flat-square&logo=vercel)](https://YOUR-DEPLOYED-LINK.vercel.app)

## Features (11 tools)

| Tool | Route | What it does |
|---|---|---|
| Merge PDFs | `/merge` | Combine two or more PDFs into one document |
| Compress PDF | `/compress` | Shrink file size, see before/after savings |
| Split PDF | `/split` | Extract every page as its own PDF |
| Extract Pages | `/extract` | Pull specific pages (`1-3,5,7-10`) into a new PDF |
| Remove Pages | `/remove-pages` | Delete unwanted pages |
| Rotate PDF | `/rotate` | Rotate all pages 90, 180, or 270 degrees |
| Add Watermark | `/watermark` | Diagonal text watermark across every page |
| Password Protect | `/password` | Encrypt and decrypt PDFs with a password |
| PDF to Images | `/pdf-to-images` | Convert pages to PNG images |
| Images to PDF | `/images-to-pdf` | Combine JPG/PNG images into a PDF |
| PDF to Text | `/pdf-to-text` | Extract text, copy or download `.txt` |

Plus [Terms & Conditions](/terms) and a [Privacy Policy](/privacy).

## Privacy

- **No API routes.** Every page is a static client-side app.
- **No network calls** in application code (verified: zero `fetch`/`axios`/`XMLHttpRequest`/`FormData`).
- **No analytics or trackers**, no cookies, no accounts.
- Files are read from disk into browser memory, processed by `pdf-lib` / `pdfjs-dist`, then written back to disk via download.
- The pdf.js worker is **bundled locally** (`public/pdf.worker.min.mjs`), so there is no CDN dependency.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a glassmorphism card style
- **pdf-lib-with-encrypt** for PDF manipulation and password encryption
- **pdfjs-dist** for rendering, thumbnails, and text extraction
- **react-dropzone**, **lucide-react**, **react-hot-toast**, **file-saver**