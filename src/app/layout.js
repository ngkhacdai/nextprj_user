import { Inter } from "next/font/google";
import "./globals.css";
import { RootStyleRegistry } from "@/components/RootStyleRegistry";
import StoreProvider from "@/lib/StoreProvider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trusty Buy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <StoreProvider>
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
