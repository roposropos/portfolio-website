import type { ReactNode } from "react";
import "../globals.css";
import { siteMetadata } from "../siteMetadata";
import { isLocale } from "@/data/content";

export const metadata = siteMetadata;

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const htmlLang = isLocale(locale) ? locale : "pl";

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
