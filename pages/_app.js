import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import Layout from "../components/Layout";
import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider } = configureChains(
  [chain.polygon],
  [infuraProvider({ infuraId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "web3rsvp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

let t;
if (typeof window !== "undefined") {
  t = localStorage.getItem("theme");
}

export default function MyApp({ Component, pageProps }) {
  const [localTheme, setLocalTheme] = useState(t);

  useEffect(() => {
    window.addEventListener("storage", () =>
      setLocalTheme(localStorage.getItem("theme"))
    );
  }, [localTheme]);

  return (
    <ThemeProvider attribute="class">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={localTheme === "light" ? lightTheme() : darkTheme()}
        >
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
