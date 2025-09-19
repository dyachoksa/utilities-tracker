const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="site-container py-12 md:flex md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm/6 md:order-2">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="text-gray-200 hover:text-white hover:underline">
              {item.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center text-sm/6 text-gray-200 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Utilities Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
