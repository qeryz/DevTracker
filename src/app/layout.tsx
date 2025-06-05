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
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
