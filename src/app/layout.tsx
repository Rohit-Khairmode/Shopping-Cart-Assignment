import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./_components/Header";
import "./_styles/globals.css";
import { CartItemContextProvider } from "./_contexts/cartItems";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Rohit Shopping cart assignment for Profile.fyl ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <CartItemContextProvider>
          <Header />
          {children}
        </CartItemContextProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
