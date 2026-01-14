import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/header";
import Link from "next/link";
import { Suspense } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { CartProvider } from "@/context/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple E-commerce Store",
  description: "E-commerce store using nextjs16",
};

function CartButtonFallback() {
  return (
    <div className="p-2 rounded-full w-10 h-10" aria-description="Loading cart">
      <ShoppingCartIcon className="w-6 h-6 opacity-20" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <CartProvider initialCart={null} initialCartId={null}>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex w-full items-center gap-8 justify-between">
                      <Link href="/" className="text-xl font-bold">
                        E-commerce
                      </Link>
                      <Navbar />
                      <Suspense fallback={<CartButtonFallback />}>
                        <CartButton />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </header>
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <CartSidebar baseUrl={"#"} />
          </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
