import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/UI/Layout";
import Navbar from "../components/UI/Navbar/Navbar";
import {
  ThemeContext,
  ThemeProvider,
} from "../states/context/theme/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { dark } = useContext(ThemeContext);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
