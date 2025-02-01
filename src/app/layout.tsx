import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fredoka } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/lib/providers";
import { ToastProvider } from "@/components/providers/toast-context";
import { ModalProvider } from "@/components/providers/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokemon Battle App",
  description: "Pokemon battle application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable}`}>
      <body>
        <SessionProvider>
          <Providers>
            <ModalProvider>
              <ToastProvider>
                <Header />
                {children}
                <Footer />
              </ToastProvider>
            </ModalProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
