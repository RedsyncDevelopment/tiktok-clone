import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/UI/Layout";
import Navbar from "../components/UI/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
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
          <div className={`flex gap-6 md:gap-20 `}>
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
