import { Check } from "lucide-react";

const benefits = [
  {
    title: "Save Money",
    description: "Spot unusual consumption patterns early and reduce your monthly utility bills by up to 20%.",
  },
  {
    title: "Stay Organized",
    description: "Keep all utility information in one centralized location. No more searching for bills.",
  },
  {
    title: "Avoid Late Fees",
    description: "Track pending payments with our dashboard. Never miss a payment deadline again.",
  },
  {
    title: "Budget Better",
    description: "Understand your monthly costs with clear visualizations and historical data.",
  },
  {
    title: "Multiple Properties",
    description: "Manage utilities for all your properties from a single account.",
  },
  {
    title: "Historical Records",
    description: "Keep permanent records of all readings and payments for future reference.",
  },
];

export function Benefits() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
              Why Choose Us
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              More Than Just Bill Tracking
            </h2>

            <p className="mb-8 text-lg text-gray-600">
              Utilities Tracker transforms the way you manage household expenses. Our platform provides insights that
              help you make smarter decisions about your utility usage.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Check className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white shadow-2xl">
              <div className="mb-6">
                <div className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-200">
                  Completely Free
                </div>
                <h3 className="text-3xl font-bold">$0 Forever</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>Unlimited properties</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>Unlimited providers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>Unlimited meter readings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>All analytics features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 flex-shrink-0" />
                  <span>No credit card required</span>
                </li>
              </ul>

              <div className="mt-8 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-blue-100">
                  No hidden fees, no premium plans, no tricks. Just a free tool to help you manage your utilities
                  better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}