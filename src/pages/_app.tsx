import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider> 
      <Component {...pageProps} />
      <Toaster />
    </QueryProvider>
 
);
}
