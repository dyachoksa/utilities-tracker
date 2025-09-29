import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for using Utilities Tracker.",
};

export default function TermsPage() {
  const lastUpdated = "September 29, 2025";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="mb-8 text-gray-600">Last updated: {lastUpdated}</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Utilities Tracker (&ldquo;Service&rdquo;), you accept and agree to be bound by these Terms
                and Conditions. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Description of Service</h2>
              <p className="text-gray-600">
                Utilities Tracker is a free web-based application that helps users track and manage household utility
                bills, meter readings, and payments. The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. User Accounts</h2>
              <div className="space-y-3 text-gray-600">
                <p>To use the Service, you must create an account. You agree to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Acceptable Use</h2>
              <div className="space-y-3 text-gray-600">
                <p>You agree not to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to the Service or related systems</li>
                  <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                  <li>Use automated means to access the Service without our express written permission</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Upload or transmit viruses, malware, or any other malicious code</li>
                  <li>Collect or harvest information about other users without their consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. User Content</h2>
              <p className="text-gray-600">
                You retain all rights to the data you input into the Service. By using the Service, you grant us a
                limited license to store and process your data solely for the purpose of providing the Service to you.
                We will not sell, share, or use your data for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Free Service</h2>
              <p className="text-gray-600">
                Utilities Tracker is provided free of charge. We reserve the right to modify, suspend, or discontinue
                the Service (or any part thereof) at any time with or without notice. We shall not be liable to you or
                any third party for any such modification, suspension, or discontinuation.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Disclaimer of Warranties</h2>
              <p className="text-gray-600">
                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE DO NOT
                WARRANT THE ACCURACY OR RELIABILITY OF ANY CALCULATIONS OR INFORMATION PROVIDED BY THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Limitation of Liability</h2>
              <p className="text-gray-600">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
                INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF
                THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">9. Data Backup</h2>
              <p className="text-gray-600">
                While we take reasonable measures to protect your data, you are responsible for maintaining your own
                backup copies of any data you input into the Service. We are not responsible for any loss or corruption
                of your data.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">10. Termination</h2>
              <p className="text-gray-600">
                You may terminate your account at any time by contacting us or using the account deletion feature. We
                reserve the right to suspend or terminate your account if we believe you have violated these Terms or
                engaged in conduct that we deem inappropriate or harmful to the Service or other users.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">11. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                posting the new Terms on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the
                Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">12. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws applicable in your
                jurisdiction, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">13. Third-Party Services</h2>
              <p className="text-gray-600">
                The Service may contain links to third-party websites or services. We are not responsible for the
                content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">14. Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify and hold harmless Utilities Tracker and its operators from any claims, damages,
                losses, liabilities, and expenses (including attorneys&apos; fees) arising out of your use of the Service or
                violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">15. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us through the contact information provided
                on our website.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">16. Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
                or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force
                and effect.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">17. Entire Agreement</h2>
              <p className="text-gray-600">
                These Terms constitute the entire agreement between you and Utilities Tracker regarding the use of the
                Service and supersede any prior agreements.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}