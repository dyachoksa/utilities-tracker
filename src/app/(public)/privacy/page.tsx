import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Utilities Tracker - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const lastUpdated = "September 29, 2025";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mb-8 text-gray-600">Last updated: {lastUpdated}</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Introduction</h2>
              <p className="text-gray-600">
                At Utilities Tracker, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                store, and protect your personal information when you use our Service. By using Utilities Tracker, you
                agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Account Information</h3>
                  <p>When you create an account, we collect:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Email address</li>
                    <li>Name (if provided)</li>
                    <li>Password (encrypted)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Utility Data</h3>
                  <p>When you use the Service, we store the information you provide, including:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Household information (addresses, property area)</li>
                    <li>Utility provider details (names, account numbers, websites)</li>
                    <li>Meter readings and consumption data</li>
                    <li>Payment records and tariff information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Technical Information</h3>
                  <p>We automatically collect certain technical information, including:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Usage data (pages visited, features used)</li>
                    <li>Log data (access times, errors)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
              <div className="space-y-3 text-gray-600">
                <p>We use the collected information for the following purposes:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>To provide, maintain, and improve the Service</li>
                  <li>To authenticate your identity and manage your account</li>
                  <li>To store and process your utility tracking data</li>
                  <li>To calculate payments and analyze consumption patterns</li>
                  <li>To communicate with you about the Service</li>
                  <li>To detect, prevent, and address technical issues</li>
                  <li>To monitor usage and improve user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Storage and Security</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Encryption of data in transit using HTTPS/TLS</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Secure password hashing</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we
                  strive to protect your personal information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Sharing and Disclosure</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Service Providers:</strong> We may share data with trusted service providers who assist us
                    in operating the Service (e.g., hosting providers, database services). These providers are bound by
                    confidentiality agreements.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your information if required by law, court
                    order, or government regulation.
                  </li>
                  <li>
                    <strong>Protection of Rights:</strong> We may disclose information to enforce our terms, protect our
                    rights, or investigate potential violations.
                  </li>
                  <li>
                    <strong>Business Transfer:</strong> If we are involved in a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that transaction.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your Data Rights</h2>
              <div className="space-y-3 text-gray-600">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Access:</strong> You can access and review your personal information at any time through
                    your account.
                  </li>
                  <li>
                    <strong>Correction:</strong> You can update or correct your information through your account
                    settings.
                  </li>
                  <li>
                    <strong>Deletion:</strong> You can request deletion of your account and all associated data at any
                    time.
                  </li>
                  <li>
                    <strong>Export:</strong> You can request an export of your data in a portable format.
                  </li>
                  <li>
                    <strong>Withdrawal of Consent:</strong> You can withdraw your consent for data processing by
                    deleting your account.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us through the contact information provided on our
                  website or use the account management features in the Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to track activity on our Service and store certain
                information. Cookies are small data files stored on your device. We use session cookies (which expire
                when you close your browser) and persistent cookies (which remain on your device) to authenticate users
                and maintain session state. You can configure your browser to refuse cookies, but this may prevent you
                from using certain features of the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Retention</h2>
              <p className="text-gray-600">
                We retain your personal information for as long as your account is active or as needed to provide you
                with the Service. If you delete your account, we will delete your personal information within a
                reasonable timeframe, except where we are required to retain certain information for legal or regulatory
                purposes. Backups may persist for a limited time but will be deleted according to our backup retention
                policies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Children&apos;s Privacy</h2>
              <p className="text-gray-600">
                Our Service is not intended for children under the age of 13 (or the applicable age of digital consent
                in your jurisdiction). We do not knowingly collect personal information from children. If you are a
                parent or guardian and believe your child has provided us with personal information, please contact us
                so we can delete such information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">International Data Transfers</h2>
              <p className="text-gray-600">
                Your information may be transferred to and maintained on servers located outside of your state,
                province, country, or other governmental jurisdiction where data protection laws may differ. By using
                the Service, you consent to the transfer of your information to such locations.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Third-Party Links</h2>
              <p className="text-gray-600">
                Our Service may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these third parties. We encourage you to read the privacy policies of any
                third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. We encourage you to
                review this Privacy Policy periodically. Your continued use of the Service after any changes indicates
                your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or our data practices, please contact us through the
                contact information provided on our website. We will respond to your inquiry as soon as reasonably
                possible.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your Consent</h2>
              <p className="text-gray-600">
                By using Utilities Tracker, you consent to the collection, use, and processing of your information as
                described in this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}