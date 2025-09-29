import {
  BarChart3,
  Building2,
  Calculator,
  FileText,
  Gauge,
  TrendingDown,
  Wallet,
  Zap,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const features = [
  {
    icon: Building2,
    title: "Multiple Properties",
    description: "Manage utilities for all your homes, apartments, or rental properties in one place.",
  },
  {
    icon: Zap,
    title: "All Utility Types",
    description: "Track electricity, gas, water, heating, maintenance fees, and more with ease.",
  },
  {
    icon: Gauge,
    title: "Meter Readings",
    description: "Record meter readings and automatically calculate consumption between periods.",
  },
  {
    icon: Calculator,
    title: "Smart Calculations",
    description: "Automatic payment calculations based on your usage and tariff rates.",
  },
  {
    icon: FileText,
    title: "Tariff Management",
    description: "Support for counter-based, fixed-rate, and area-based billing structures.",
  },
  {
    icon: Wallet,
    title: "Payment Tracking",
    description: "Keep track of paid and pending bills. Never miss a payment deadline again.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts showing spending trends and consumption patterns over time.",
  },
  {
    icon: TrendingDown,
    title: "Save Money",
    description: "Identify unusual usage patterns and optimize your consumption to reduce costs.",
  },
];

export function Features() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="site-container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Manage Utilities
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A comprehensive toolkit designed to simplify utility management and help you save money.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-gray-200 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="size-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}