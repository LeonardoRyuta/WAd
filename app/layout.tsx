import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { config } from "./config";
import { cookieToInitialState } from "@account-kit/core";
import { Providers } from "./providers";
import { headers } from "next/headers";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThirdwebProvider> */}
        <Providers initialState={initialState}>
          <ThirdwebProvider>
            <div className="min-h-screen bg-gray-100 flex flex-col">
              <Navbar />
              {children}
            </div>
          </ThirdwebProvider>
        </Providers>
        {/* </ThirdwebProvider> */}
      </body>
    </html>
  );
}
