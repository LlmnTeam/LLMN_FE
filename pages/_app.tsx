import "@/styles/globals.css";
import "@/styles/custom-calendar.css";
import "@/styles/custom-react-terminal-ui.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css"; // 기본 nprogress 스타일

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(
        "--vh",
        `${vh}px`,
        "important"
      );
      document.documentElement.style.setProperty(
        "--vh-offset",
        `${vh * 100 - 70}px`,
        "important"
      );
    };

    updateVH();
    setIsMounted(true);

    window.addEventListener("resize", updateVH);

    return () => {
      window.removeEventListener("resize", updateVH);
    };
  }, []);

  if (!isMounted) return <div style={{ visibility: "hidden" }} />;

  return <Component {...pageProps} />;
}
