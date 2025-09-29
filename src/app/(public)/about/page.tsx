import type { Metadata } from "next";

import { Lightbulb, Lock, Sparkles, Target, Users, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Utilities Tracker and our mission to help people manage their utility bills better.",
};

const values = [
  {
    icon: Users,
    title: "User-Centric",
    description: "Built with real user needs in mind. Every feature is designed to solve actual problems people face.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data belongs to you. We never sell your information or share it with third parties.",
  },
  {
    icon: Zap,
    title: "Simple & Fast",
    description: "Clean, intuitive interface that gets out of your way and lets you focus on what matters.",
  },
  {
    icon: Sparkles,
    title: "Always Free",
    description: "No premium tiers, no paywalls, no catch. We believe everyone deserves access to good financial tools.",
  },
];

const facts = [
  {
    icon: Lightbulb,
    title: "Born from Frustration",
    description:
      "Utilities Tracker was created because existing solutions were either too expensive, too complicated, or didn't support the complex tariff structures many countries use. We wanted something better.",
  },
  {
    icon: Target,
    title: "Purpose-Built",
    description:
      "Unlike generic expense trackers, we're specifically designed for utilities. This means features like meter readings, multi-zone tariffs, and area-based billing work exactly as they should.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Feature requests and feedback shape our roadmap. The app evolves based on what users actually need, not what we think they need.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">About Utilities Tracker</h1>
            <p className="text-lg text-gray-600 sm:text-xl">
              A free, open-minded platform designed to help people take control of their utility bills and save money.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                Managing utility bills shouldn&apos;t be complicated or expensive. Yet for millions of people, tracking meter
                readings, calculating complex tariffs, and monitoring spending across multiple properties remains a
                frustrating challenge.
              </p>
              <p>
                Utilities Tracker was built to change that. We provide a powerful, easy-to-use platform that helps you
                understand your utility usage, identify opportunities to save money, and stay on top of payments — all
                completely free.
              </p>
              <p>
                Our mission is simple: empower people with the tools they need to make informed decisions about their
                utility consumption and spending, without barriers or costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="site-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              These principles guide everything we build and every decision we make.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-gray-200">
                  <CardHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-blue-100">
                      <Icon className="size-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="site-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Interesting Facts</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A few things you might not know about Utilities Tracker.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.title} className="flex gap-6">
                  <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="size-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{fact.title}</h3>
                    <p className="text-gray-600">{fact.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why It&apos;s Free</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                A question we get often: &ldquo;How can this be free?&rdquo; The answer is straightforward — this is a passion
                project built to solve a real problem, not to generate revenue.
              </p>
              <p>
                We believe that financial management tools should be accessible to everyone, regardless of income. The
                people who need budget-tracking tools the most are often those who can least afford expensive
                subscriptions.
              </p>
              <p>
                There are no hidden costs, no &ldquo;freemium&rdquo; upsells, and no plans to monetize your data. Utilities Tracker
                will remain free, forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">What&apos;s Next?</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                We&rsquo;re constantly working to make Utilities Tracker better. Future plans include mobile apps, CSV
                imports/exports, bill reminders, consumption forecasting, and integrations with smart home devices.
              </p>
              <p>
                Have ideas or feedback? We&rsquo;d love to hear from you. Every feature we add is driven by user needs and
                requests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}