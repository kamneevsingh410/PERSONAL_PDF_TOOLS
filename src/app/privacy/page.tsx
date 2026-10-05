import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy | PDF Toolkit',
  description: 'Privacy policy for PDF Toolkit. Your files never leave your device.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar title="Privacy Policy" showBack />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: October 5, 2026</p>

        <div className="space-y-8 text-slate-600">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              The short version
            </h2>
            <p className="leading-relaxed">
              Your files are processed entirely inside your browser. They are never
              uploaded to a server, never stored by us, and never seen by anyone else.
              We do not collect personal data, run analytics, or use tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              1. Files you process
            </h2>
            <p className="leading-relaxed">
              All PDF and image processing happens locally on your device using
              JavaScript running in your browser. Your documents are read from your file
              system into browser memory, processed, and written back to you as a
              download. No file contents are transmitted over the network at any point.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              2. Information we collect
            </h2>
            <p className="leading-relaxed">
              We do not ask for a name, email address, or account, and we do not collect
              personal information through the application itself. There is no sign-up
              form, no contact form, and no user profile.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              3. Cookies and analytics
            </h2>
            <p className="leading-relaxed">
              The application sets no cookies of its own and includes no analytics,
              advertising, or tracking scripts. Nothing about your usage of the tools is
              recorded or profiled.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              4. Hosting and logs
            </h2>
            <p className="leading-relaxed">
              The site is delivered by a static hosting provider (for example Vercel).
              Like any web server, that provider may automatically receive standard
              technical request data such as your IP address, browser type, and the
              pages requested, for the purpose of delivering the site and maintaining
              security. This is server infrastructure data, not the contents of your
              files, and it is governed by the hosting provider&apos;s own policies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              5. Third parties
            </h2>
            <p className="leading-relaxed">
              The application contains no third-party embeds, fonts, scripts, or ad
              networks. The PDF engine and its worker file are bundled with the site, so
              your browser does not call external services to process documents.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              6. Children&apos;s privacy
            </h2>
            <p className="leading-relaxed">
              Because no personal data is collected, the Service does not knowingly
              gather information from children or from anyone else.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              7. Changes to this policy
            </h2>
            <p className="leading-relaxed">
              If the way the Service handles data ever changes, this page will be updated
              and the &quot;Last updated&quot; date above will change accordingly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">8. Contact</h2>
            <p className="leading-relaxed">
              Questions about privacy can be raised in the project&apos;s GitHub
              repository or through any contact details published there.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
