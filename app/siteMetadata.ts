import type { Metadata } from "next";

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);
const socialPreviewImageUrl = new URL("/api/og", metadataBase).toString();

export const socialPreviewImage = {
  url: socialPreviewImageUrl,
  width: 1200,
  height: 630,
  alt: "Robert Tworek - Portfolio"
};

export const siteMetadata: Metadata = {
  metadataBase,
  title: {
    default: "Robert Tworek - Portfolio",
    template: "%s | Robert Tworek"
  },
  description:
    "Portfolio Roberta Tworka: projekty akademickie i techniczne z aplikacji webowych, systemów desktopowych, baz danych, sieci oraz dokumentacji.",
  keywords: [
    "Robert Tworek",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Wroclaw University of Science and Technology"
  ],
  authors: [{ name: "Robert Tworek" }],
  creator: "Robert Tworek",
  openGraph: {
    title: "Robert Tworek - Portfolio",
    description:
      "Student Informatyki Technicznej pracujący nad projektami z obszaru aplikacji, baz danych, systemów i komunikacji sieciowej.",
    type: "website",
    images: [socialPreviewImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Tworek - Portfolio",
    description:
      "Portfolio Roberta Tworka: projekty akademickie i techniczne z aplikacji webowych, systemów desktopowych, baz danych, sieci oraz dokumentacji.",
    images: [socialPreviewImage.url]
  }
};
