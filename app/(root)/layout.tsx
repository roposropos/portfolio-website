import type { ReactNode } from "react";
import "../globals.css";
import { siteMetadata } from "../siteMetadata";

export const metadata = siteMetadata;

export default function RootRedirectLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
