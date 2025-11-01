import { useTranslations } from "next-intl";
import Link from "next/link";

const navigation = [
  { key: "home", label: "public.navigation.home", href: "/" },
  { key: "about", label: "public.navigation.about", href: "/about" },
  { key: "terms", label: "public.navigation.terms", href: "/terms" },
  { key: "privacy", label: "public.navigation.privacy", href: "/privacy" },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900">
      <div className="site-container py-12 md:flex md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm/6 md:order-2">
          {navigation.map((item) => (
            <Link key={item.key} href={item.href} className="text-gray-200 hover:text-white hover:underline">
              {t(item.label as (typeof navigation)[number]["label"])}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-center text-sm/6 text-gray-200 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Utilities Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
