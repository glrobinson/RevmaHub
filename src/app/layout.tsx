import { Inter } from 'next/font/google';
import "./globals.css";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Revma Education Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        <main className="pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
