import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserContextProvider from "@/context/user";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Кто хочет стать миллионером?",
  description: "Made by Talan Kirill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>

      </html>
    </UserContextProvider>
  );
}
