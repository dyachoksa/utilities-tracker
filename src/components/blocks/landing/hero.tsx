import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 lg:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
            100% Free • No Subscriptions • No Hidden Fees
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Take Control of Your <span className="text-blue-600">Utility Bills</span>
          </h1>

          <p className="mb-10 text-lg text-gray-600 sm:text-xl">
            Track electricity, gas, water, and heating usage. Monitor meter readings, manage multiple properties, and
            understand your spending with beautiful visualizations — all completely free.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">No credit card required • Start tracking in minutes</p>
        </div>
      </div>
    </section>
  );
}