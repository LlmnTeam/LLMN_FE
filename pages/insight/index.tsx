import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import EmptyBox from "@/components/commons/empty-box";
import Layout from "@/components/commons/layout";
import { InsightPageProps, getInsightSSR } from "@/ssr/insight/insight-ssr";
import { Insight } from "@/types/insight/insight-type";
import { Nickname } from "@/types/login/login-type";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<InsightPageProps> =
  getInsightSSR;

export default function Insight({ NicknameSSR, InsightSSR }: InsightPageProps) {
  const [nickname, setNickname] = useState<Nickname | null>(NicknameSSR);
  const [insight, setInsight] = useState<Insight | null>(InsightSSR);
  console.log("insight: ", insight);

  return (
    <Layout nickname={nickname?.nickName || null}>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              인사이트
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <div>
              <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
            </div>
          </div>
        </div>
        {insight?.performanceSummary ? (
          <Container
            title="성능 요약"
            link="/insight/performance"
            update={`${insight?.performanceUpdateTime?.split(" ")[0]} 업데이트`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {insight?.performanceSummary}
            </div>
          </Container>
        ) : (
          <EmptyBox
            title={"성능 요약"}
            content={"요약 내역이 존재하지 않습니다."}
          />
        )}
        {insight?.dailySummary ? (
          <Container
            title="일일 요약"
            link="/insight/daily"
            update={`${insight?.dailyUpdateTime?.split(" ")[0]} 업데이트`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {insight?.dailySummary}
            </div>
          </Container>
        ) : (
          <EmptyBox
            title={"일일 요약"}
            content={"요약 내역이 존재하지 않습니다."}
          />
        )}
        {insight?.trendSummary ? (
          <Container
            title="장기 트렌드 분석"
            link="/insight/trend"
            update={`${insight?.trendUpdateTime?.split(" ")[0]} 업데이트`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {insight?.trendSummary}
            </div>
          </Container>
        ) : (
          <EmptyBox
            title={"장기 트렌드 분석"}
            content={"분석 내역이 존재하지 않습니다."}
          />
        )}
        {insight?.recommendation ? (
          <Container
            title="추천"
            link="/insight/recommendation"
            update={`${insight?.recommendUpdateTime?.split(" ")[0]} 업데이트`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {insight?.recommendation}
            </div>
          </Container>
        ) : (
          <EmptyBox title={"추천"} content={"추천 내역이 존재하지 않습니다."} />
        )}
      </div>
    </Layout>
  );
}
