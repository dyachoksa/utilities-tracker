import { Benefits } from "~/components/blocks/landing/benefits";
import { CTA } from "~/components/blocks/landing/cta";
import { Features } from "~/components/blocks/landing/features";
import { Hero } from "~/components/blocks/landing/hero";
import { HowItWorks } from "~/components/blocks/landing/how-it-works";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <CTA />
    </>
  );
}
