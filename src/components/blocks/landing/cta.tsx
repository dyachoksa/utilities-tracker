import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 lg:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Take Control of Your Utility Bills?
          </h2>

          <p className="mb-10 text-lg text-blue-100 sm:text-xl">
            Join others who are already saving money and staying organized with Utilities Tracker. Get started in
            minutes — no credit card required.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            Free forever • No subscriptions • No hidden costs
          </p>
        </div>
      </div>
    </section>
  );
}