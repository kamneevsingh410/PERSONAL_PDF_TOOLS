import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Terms & Conditions | PDF Toolkit',
  description: 'Terms and conditions for using PDF Toolkit.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar title="Terms & Conditions" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          Terms &amp; Conditions
        </h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: October 5, 2026</p>

        <div className="space-y-8 text-slate-600">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              1. Acceptance of terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using PDF Toolkit (the &quot;Service&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms
              &amp; Conditions. If you do not agree with any part of these terms, do not
              use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              2. Description of the Service
            </h2>
            <p className="leading-relaxed">
              PDF Toolkit is a free, browser-based collection of PDF utilities. All file
              processing happens locally in your web browser. We do not require an
              account, and we do not receive, store, or view your files.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              3. Your files and your responsibility
            </h2>
            <p className="leading-relaxed">
              You retain full ownership of every file you process with the Service. You
              are solely responsible for the content of your files and for keeping
              backups of your original documents. Because processing happens on your
              device, we cannot recover files that are lost, corrupted, or overwritten in
              your own browser or file system.
            </p>
            <p className="mt-3 leading-relaxed">
              You agree to use the Service only for files you have the right to work with
              and only for lawful purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              4. No account, no guarantee of availability
            </h2>
            <p className="leading-relaxed">
              The Service is provided free of charge and on an &quot;as is&quot; and
              &quot;as available&quot; basis. We may modify, suspend, or discontinue any
              part of the Service at any time without notice. We do not guarantee that
              the Service will be uninterrupted, error-free, or available in every
              browser or region.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              5. Limitation of liability
            </h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by applicable law, we shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages,
              or any loss of data, profits, goodwill, or business opportunity, arising
              out of or in connection with your use of the Service. Your sole remedy is
              to stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              6. Intellectual property
            </h2>
            <p className="leading-relaxed">
              The Service, including its design, text, and code, is owned by or licensed
              to us and is protected by applicable intellectual property laws. You may
              not copy, modify, distribute, or reverse engineer the Service except as
              permitted by law. Open source libraries used by the Service remain subject
              to their own licenses.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              7. Disclaimer of warranties
            </h2>
            <p className="leading-relaxed">
              We make no warranties, express or implied, regarding the Service, including
              its accuracy, reliability, or fitness for a particular purpose. PDF output
              may vary depending on your browser and the structure of your documents.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              8. Changes to these terms
            </h2>
            <p className="leading-relaxed">
              We may update these terms from time to time. The latest version will always
              be published on this page, and the &quot;Last updated&quot; date above will
              reflect the most recent change. Continued use of the Service after a change
              means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">9. Contact</h2>
            <p className="leading-relaxed">
              Questions about these terms can be raised in the project&apos;s GitHub
              repository or through any contact details published there.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
