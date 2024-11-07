// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  InsightSummaryPageProps,
  getInsightSummarySSR,
} from "@/src/ssr/insight/insight-summary-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { InsightSummary } from "@/src/types/insight/insight-type";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import Container from "@/src/components/commons/container";
import EmptyBox from "@/src/components/commons/empty-box";

export const getServerSideProps: GetServerSideProps<InsightSummaryPageProps> =
  getInsightSummarySSR;

export default function InsightSummary({
  NicknameSSR,
  InsightSummarySSR,
  AlarmListSSR,
  unreadAlarmCount,
}: InsightSummaryPageProps) {
  const router = useRouter();
  const { type } = router.query;
  const title = {
    performance: "성능 요약",
    daily: "일일 요약",
    trend: "장기 트렌드",
    recommendation: "추천",
  };
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const insightSummaryRef = useRef<InsightSummary | null>(InsightSummarySSR);

  return (
    <>
      <Head>
        <title>
          LLMN - Insight{" "}
          {typeof type === "string" &&
            type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase()}
        </title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <Link href="/insight">
                <Image
                  src="/images/back.svg"
                  alt="back"
                  width={45}
                  height={45}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
                  priority
                />
              </Link>
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                {title[type as keyof typeof title]}
              </span>
            </div>
            {/* <div className="flex flex-row justify-start items-center"> */}
            <div className="hidden">
              <div>
                <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
              </div>
            </div>
          </div>
          {insightSummaryRef.current &&
          insightSummaryRef.current.summaries.length > 0 ? (
            insightSummaryRef.current?.summaries?.map((summary) => (
              <div key={summary.id}>
                <Container title={summary.time} link="" update="">
                  <div
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                  >
                    {summary.content}
                  </div>
                </Container>
              </div>
            ))
          ) : (
            <EmptyBox
              title={`title.${type}`}
              content={
                type === "trend"
                  ? "트렌드 내역이 존재하지 않습니다."
                  : type === "recommend"
                  ? "추천 내역이 존재하지 않습니다."
                  : "요약 내역이 존재하지 않습니다."
              }
            />
          )}
        </div>
      </Layout>
    </>
  );
}
