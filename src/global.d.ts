import type messages from "~/messages/en.json";
import type { locales } from "./i18n/locales";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
