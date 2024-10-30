import "@/styles/globals.css";
import "@/styles/custom-calendar.css";
import "@/styles/custom-react-terminal-ui.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
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
      // console.log("vh: ", vh);
      // console.log(document.documentElement.style.getPropertyValue("--vh"));
      // console.log(
      //   document.documentElement.style.getPropertyValue("--vh-offset")
      // );
    };

    updateVH();

    window.addEventListener("resize", updateVH);

    return () => {
      window.removeEventListener("resize", updateVH);
    };
  }, []);

  return <Component {...pageProps} />;
}
