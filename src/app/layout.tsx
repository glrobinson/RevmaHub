import { Inter } from 'next/font/google';
import "./globals.css";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { TranslationProvider } from './context/TranslationContext';

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
    <html lang="en"> {/* Optional: Set this dynamically in each page */}
      <body className={`${inter.className} antialiased`}>
        <TranslationProvider>
          <NavBar />
          <main className="pt-[80px]">{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}