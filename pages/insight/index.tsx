import { fetchInsight } from "@/api/insight/insight-api";
import ConfirmModal from "@/components/commons/confirm-modal";
import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import EmptyBox from "@/components/commons/empty-box";
import Layout from "@/components/commons/layout";
import { InsightPageProps, getInsightSSR } from "@/ssr/insight/insight-ssr";
import { Insight } from "@/types/insight/insight-type";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<InsightPageProps> =
  getInsightSSR;

export default function Insight({ InsightSSR }: InsightPageProps) {
  const [insight, setInsight] = useState<Insight | null>(InsightSSR);
  console.log("insight: ", insight);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openConfirmModal = (option: string) => {
    setSelectedOption(option);
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleMenuSelect = (option: string) => {
    if (option === "edit") return;
    openConfirmModal(option);
  };

  return (
    <Layout>
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
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        {insight?.performanceSummary ? (
          <Container
            title="성능 요약"
            link={`/insight`}
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
            link={`/insight`}
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
            link={`/insight`}
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
            link={`/insight`}
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
