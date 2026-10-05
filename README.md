# PDF Toolkit 📄

> Your personal, privacy-first PDF toolkit — a self-hosted alternative to iLovePDF. All processing happens **entirely in your browser**: files never leave your device.
>
> **Built by KS**  — for daily, personal use.

## 🌐 Live Demo

> **🔗 https://YOUR-DEPLOYED-LINK.vercel.app**
>


[![Deployed](https://img.shields.io/badge/live-demo-blue?style=flat-square&logo=vercel)](https://YOUR-DEPLOYED-LINK.vercel.app)

## ✨ Features (16 tools)

| Tool | Route | What it does |
|---|---|---|
| Merge PDFs | `/merge` | Combine PDFs with **drag-to-reorder** |
| Compress PDF | `/compress` | Shrink file size, see before/after savings |
| Split PDF | `/split` | Extract every page as its own PDF |
| Extract Pages | `/extract` | Pull specific pages (`1-3,5,7-10`) into a new PDF |
| Remove Pages | `/remove-pages` | Delete unwanted pages |
| Rotate PDF | `/rotate` | Rotate all pages 90°/180°/270° |
| Rotate Selected | `/rotate-selected` | Preview pages, rotate only the ones you pick |
| Crop PDF | `/crop` | Trim margins from each edge (mm) |
| Extreme Compress | `/extreme-compress` | Re-encode pages as JPEG for maximum size reduction |
| Page Numbers | `/page-numbers` | Stamp page numbers (position, format, start number) |
| Add Watermark | `/watermark` | Diagonal text watermark with opacity control |
| Password Protect | `/password` | Encrypt / decrypt PDFs with a password |
| Edit Metadata | `/metadata` | Change title, author, subject, keywords |
| PDF to Images | `/pdf-to-images` | Convert pages to high-res PNGs |
| Images to PDF | `/images-to-pdf` | Combine JPG/PNG images into a PDF |
| PDF to Text | `/pdf-to-text` | Extract text, copy or download `.txt` |

## 🔒 Privacy

- **No API routes.** Every page is a static client-side app.
- **No network calls** in application code (verified: zero `fetch`/`axios`/`XMLHttpRequest`/`FormData`).
- **No analytics or trackers.**
- Files are read from disk into browser memory, processed by `pdf-lib` / `pdfjs-dist`, then written back to disk via download.
- The pdf.js worker is **bundled locally** (`public/pdf.worker.min.mjs`) — no CDN dependency.

## 🛠 Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — glassmorphism UI with **dark/light theme** (`darkMode: 'class'`)
- **pdf-lib-with-encrypt** — PDF manipulation + password encryption
- **pdfjs-dist** — rendering, thumbnails, text extraction
- **@dnd-kit** — drag-to-reorder in merge
- **react-dropzone**, **lucide-react**, **react-hot-toast**, **file-saver**
