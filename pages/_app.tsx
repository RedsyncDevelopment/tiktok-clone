import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "../components/UI/Navbar";
import Sidebar from "../components/UI/Sidebar";
import { ThemeProvider } from "../states/context/theme/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
