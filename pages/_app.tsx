// 글로벌 스타일
import "@/src/styles/globals.css";
import "@/src/styles/custom-calendar.css";
import "@/src/styles/custom-react-terminal-ui.css";
import "nprogress/nprogress.css";

// 외부 라이브러리
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

// 타입 정의
import type { AppProps } from "next/app";

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
