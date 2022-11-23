import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import Footer from "components/Footer";
import Header from "components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { log } from "next-axiom";

export default function App({ Component, pageProps }: AppProps) {
  log.info("welcome to muvistack");
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell padding="md" header={<Header />} footer={<Footer />}>
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </ClerkProvider>
  );
}

export { reportWebVitals } from "next-axiom";
