import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${plusJakartaSans.variable} font-sans`}>
      <QueryProvider>
        <Component {...pageProps} />
        <Toaster />
      </QueryProvider>
    </div>
  );
}
