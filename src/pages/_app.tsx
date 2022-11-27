import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import Footer from "components/Footer";
import Header from "components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
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
