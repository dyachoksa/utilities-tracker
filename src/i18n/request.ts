import type { Locale } from "./locales";

import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import { locales } from "./locales";

function getPreferredLocale(header: string, supported: readonly string[]): Locale {
  // split into entries like "uk", "uk-UA;q=0.9", ...
  const parsed = header
    .split(",")
    .map((part) => {
      const [langPart, qPart] = part.trim().split(";q=");
      return {
        lang: langPart.toLowerCase(),
        q: qPart ? parseFloat(qPart) : 1.0,
      };
    })
    // sort by quality (q) descending
    .sort((a, b) => b.q - a.q);

  // check each language in order of priority
  for (const { lang } of parsed) {
    // normalize like "uk-UA" → "uk"
    const base = lang.split("-")[0];
    if (supported.includes(base)) {
      return base as Locale;
    }
  }

  return "en";
}

export default getRequestConfig(async () => {
  // Order of selection:
  // 1. App-specific header with name `X-Current-Lang`
  // 2. Cookie with name `currentLang`
  // 3. Browser accept-language header
  // 4. Fallback to `en`
  const acceptLanguage = (await headers()).get("accept-language");
  const preferredLocale = acceptLanguage ? getPreferredLocale(acceptLanguage, locales) : "en";

  const locale =
    (((await headers()).get("X-Current-Lang") || (await cookies()).get("currentLang")?.value) as Locale) ||
    preferredLocale;

  const messages = (await import(`~/messages/${locale}.json`)).default;

  return { locale, messages };
});
