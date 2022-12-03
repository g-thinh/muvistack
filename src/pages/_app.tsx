import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import Footer from "components/Footer";
import Header from "components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { configureAbly } from "@ably-labs/react-hooks";

const ablyClientId = process.env.ablyClientId;

configureAbly({
  authUrl: `${process.env.baseUrl}/api/ably/createTokenRequest?clientId=${ablyClientId}`,
  clientId: ablyClientId,
});

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
