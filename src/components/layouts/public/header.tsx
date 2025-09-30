import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "~/components/ui/navigation-menu";

const items = [
  { key: "home", label: "public.navigation.home", href: "/" },
  { key: "about", label: "public.navigation.about", href: "/about" },
] as const;

interface Props {
  isAuthenticated: boolean;
}

export function Header({ isAuthenticated }: Props) {
  const t = useTranslations();

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
              <NavigationMenuLink key={item.key} asChild>
                <Link href={item.href}>{t(item.label as (typeof items)[number]["label"])}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button asChild>
              <Link href="/app/dashboard">{t("public.navigation.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">{t("auth.login.actions.login")}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{t("auth.sign-up.actions.signup")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
