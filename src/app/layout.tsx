import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Every page reads live content from the database (via SiteHeader/SiteFooter
// and the pages themselves), and that content changes through the admin
// panel without a redeploy — so render per-request instead of at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Phil Korean Medicine Hospital",
    template: "%s | Phil Korean Medicine Hospital",
  },
  description:
    "Phil Korean Medicine Hospital offers traditional Korean medicine care, including acupuncture, herbal medicine, and rehabilitation therapy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory-100 text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
