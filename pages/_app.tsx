import "@/styles/globals.css";
import "@/styles/custom-calendar.css";
import "@/styles/custom-react-terminal-ui.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 화면 높이 계산 로직
    const updateVH = () => {
      const vh = window.innerHeight * 0.01; // 1vh 계산
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
      console.log("vh: ", vh);
      console.log(document.documentElement.style.getPropertyValue("--vh"));
      console.log(
        document.documentElement.style.getPropertyValue("--vh-offset")
      );
    };

    // 처음 로드 시 계산
    updateVH();

    // 화면 크기 변화 감지하여 재계산
    window.addEventListener("resize", updateVH);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateVH);
    };
  }, []);

  return <Component {...pageProps} />;
}
