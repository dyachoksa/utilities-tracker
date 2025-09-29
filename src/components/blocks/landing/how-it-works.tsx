import { Building, ChartLine, CreditCard, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Building,
    step: "01",
    title: "Add Your Properties",
    description: "Start by adding your household information, including address and living area.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Set Up Providers",
    description: "Add your utility providers — electricity, gas, water, heating, and more.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Enter Readings & Tariffs",
    description: "Record meter readings and configure your billing tariffs for accurate calculations.",
  },
  {
    icon: ChartLine,
    step: "04",
    title: "Track & Save",
    description: "Monitor payments, analyze trends, and optimize usage to reduce your utility costs.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="site-container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Get started in minutes with our simple, intuitive workflow.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Icon className="size-7 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-blue-200">{step.step}</span>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}