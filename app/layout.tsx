import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAB Foundation | Education, Health & Possibility",
  description:
    "Kassim Alli-Balogun Foundation — practical support in education and healthcare for communities in Lagos, Nigeria.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
