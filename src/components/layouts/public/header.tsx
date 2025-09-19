import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "~/components/ui/navigation-menu";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

interface Props {
  isAuthenticated: boolean;
}

export function Header({ isAuthenticated }: Props) {
  return (
    <header className="bg-white py-4">
      <div className="site-container flex items-center justify-between">
        <Link className="flex items-center gap-2 text-lg font-semibold text-gray-800" href="/">
          <Image src="/logo.png" alt="Logo" width={512} height={512} className="size-8" />
          Utilities Tracker
        </Link>

        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuLink key={item.label} asChild>
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button asChild>
              <Link href="/app/dashboard">Open dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
