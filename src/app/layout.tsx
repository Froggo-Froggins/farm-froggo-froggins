import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserDataProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FROGO FROGGINS",
  description: "EASIEST 100x COIN YET!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserDataProvider>
      <body className={inter.className}>{children}</body>
      </UserDataProvider>
    </html>
  );
}
