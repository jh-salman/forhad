import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Electro Mart - Electronics & Accessories",
  description: "Your trusted source for electronics and accessories. Shop tripods, microphones, headsets and more.",
  keywords: "electronics, accessories, tripods, microphones, headsets, Bangladesh",
  authors: [{ name: "Electro Mart" }],
  openGraph: {
    title: "Electro Mart - Electronics & Accessories",
    description: "Your trusted source for electronics and accessories",
    type: "website",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electro Mart - Electronics & Accessories",
    description: "Your trusted source for electronics and accessories",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
