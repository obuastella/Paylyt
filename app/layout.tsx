import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Paylyt - Master Your Money, Wherever Life Takes You",
  description:
    "Track spending, forecast your future, and unlock financial freedom with insights that matter. Available on iOS & Android. Free to use.",
  keywords: [
    "finance",
    "money tracking",
    "budgeting",
    "expense tracking",
    "financial freedom",
  ],
  authors: [{ name: "Paylyt" }],
  openGraph: {
    title: "Paylyt - Master Your Money",
    description:
      "Track spending, forecast your future, and unlock financial freedom with insights that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
