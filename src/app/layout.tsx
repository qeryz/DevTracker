import Head from "next/head";
import { Providers } from "@/app/context";
import { Navbar } from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: {
    default: "DevTracker",
    template: "%s | DevTracker",
  },
  description: "A developer productivity tracker app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://fragile-1zof.onrender.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fragile-1zof.onrender.com" />
      </Head>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
