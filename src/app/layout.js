import { Oswald, Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorSpotlight from "@/components/CursorSpotlight";
import Preloader from "@/components/Preloader";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cartStore";
import { CupProvider } from "@/lib/cupContext";

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-oswald' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "DELTA PACK® | Advanced Paper Cup Manufacturing",
  description: "German technology, Egyptian hands. Precision paper cups manufacturing.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "DeltaPack" },
  icons: {
    icon: "/favicon.ico",
    apple: [{ url: "/icon-192.png", sizes: "192x192" }, { url: "/icon-512.png", sizes: "512x512" }],
  },
  other: { "mobile-web-app-capable": "yes" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${inter.variable} ${oswald.variable} bg-[#050505] text-white overflow-x-hidden selection:bg-green-500 selection:text-black`}>
        <Preloader />
        <CursorSpotlight />

        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

        <CartProvider>
          <CupProvider>
            <div className="relative z-20 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <CartDrawer />
          </CupProvider>
        </CartProvider>
      </body>
    </html>
  );
}
