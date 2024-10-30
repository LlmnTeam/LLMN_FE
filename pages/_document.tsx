import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 페이지 제목 */}
        <title>LLMN</title>

        {/* 메타 설명 */}
        <meta
          name="description"
          content="멀티 클라우드 환경에서 로그 데이터를 수집하고 LLM을 활용해 요약 및 분석하는 시스템입니다. 실시간 모니터링과 이상 탐지를 지원하며, SSH 명령을 통한 원격 서버 제어가 가능합니다. 반응형 웹 UI를 제공합니다."
        />

        {/* 메타 태그 - 뷰포트 설정 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph 메타 태그 (SNS 미리보기용) */}
        <meta property="og:title" content="My Awesome Web Page" />
        <meta
          property="og:description"
          content="This is a concise summary of the page's content."
        />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:url" content="http://54.180.252.169:3000" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
