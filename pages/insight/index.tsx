// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRef } from "react";
import Head from "next/head";

// 서버사이드 데이터 및 타입
import { InsightPageProps, getInsightSSR } from "@/src/ssr/insight/insight-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { Insight } from "@/src/types/insight/insight-type";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import Container from "@/src/components/commons/container";
import EmptyBox from "@/src/components/commons/empty-box";

export const getServerSideProps: GetServerSideProps<InsightPageProps> =
  getInsightSSR;

export default function Insight({
  NicknameSSR,
  InsightSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: InsightPageProps) {
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const insightRef = useRef<Insight | null>(InsightSSR);

  return (
    <>
      <Head>
        <title>LLMN - Insight</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                인사이트
              </span>
            </div>
            {/* <div className="flex flex-row justify-start items-center"> */}
            <div className="hidden">
              <div>
                <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
              </div>
            </div>
          </div>
          {insightRef.current?.performanceSummary ? (
            <Container
              title="성능 요약"
              link="/insight/performance"
              update={`${
                insightRef.current?.performanceUpdateTime?.split(" ")[0]
              } 업데이트`}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {insightRef.current?.performanceSummary}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"성능 요약"}
              content={"요약 내역이 존재하지 않습니다."}
            />
          )}
          {insightRef.current?.dailySummary ? (
            <Container
              title="일일 요약"
              link="/insight/daily"
              update={`${
                insightRef.current?.dailyUpdateTime?.split(" ")[0]
              } 업데이트`}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {insightRef.current?.dailySummary}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"일일 요약"}
              content={"요약 내역이 존재하지 않습니다."}
            />
          )}
          {insightRef.current?.trendSummary ? (
            <Container
              title="장기 트렌드 분석"
              link="/insight/trend"
              update={`${
                insightRef.current?.trendUpdateTime?.split(" ")[0]
              } 업데이트`}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {insightRef.current?.trendSummary}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"장기 트렌드 분석"}
              content={"분석 내역이 존재하지 않습니다."}
            />
          )}
          {insightRef.current?.recommendation ? (
            <Container
              title="추천"
              link="/insight/recommendation"
              update={`${
                insightRef.current?.recommendUpdateTime?.split(" ")[0]
              } 업데이트`}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {insightRef.current?.recommendation}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"추천"}
              content={"추천 내역이 존재하지 않습니다."}
            />
          )}
        </div>
      </Layout>
    </>
  );
}
