// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  ProjectSummariesPageProps,
  getProjectSummariesSSR,
} from "@/src/ssr/project/project-summaries-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { LogFileList } from "@/src/types/project/project-type";

// 프로젝트 내부 훅과 유틸리티 함수
import useShellModal from "@/src/hooks/project/use-shell-modal";
import useLogFileModal from "@/src/hooks/project/use-log-file-modal";
import { cls } from "@/src/utils/class-utils";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import Container from "@/src/components/commons/container";
import EmptyBox from "@/src/components/commons/empty-box";
import TerminalModal from "@/src/components/project/terminal-modal";
import LogFileModal from "@/src/components/project/log-file-modal";

export const getServerSideProps: GetServerSideProps<ProjectSummariesPageProps> =
  getProjectSummariesSSR;

export default function ProjectSummaries({
  NicknameSSR,
  ProjectSummaryListSSR,
  LogFileListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ProjectSummariesPageProps) {
  const router = useRouter();
  const { id, page: pageQuery } = router.query;

  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const logFileListRef = useRef<LogFileList | null>(LogFileListSSR);

  const {
    isShellModalOpen,
    openShellModal,
    closeShellModal,
    inputs,
    setInputs,
    handleCommandSubmit,
  } = useShellModal();

  const { isLogFileModalOpen, openLogFileModal, closeLogFileModal } =
    useLogFileModal();

  const currentPage = parseInt(pageQuery as string, 10) || 1;
  const totalPages = ProjectSummaryListSSR?.pageNum || 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  useEffect(() => {
    const layoutContainer = document.querySelector(".custom-scrollbar");
    if (layoutContainer) {
      layoutContainer.scrollTop = 0;
    }
  }, [currentPage]);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`/project/${id}/summaries?page=${newPage}`);
  };

  const getPageNumbers = () => {
    const maxPageButtons = 5;
    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      <Head>
        <title>LLMN - {ProjectSummaryListSSR?.name} Summaries</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
        scrollContainerRef={scrollContainerRef}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <Link href={`/project/${id}`}>
                <Image
                  src="/images/back.svg"
                  alt="back"
                  width={45}
                  height={45}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px] cursor-pointer"
                  priority
                />
              </Link>
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold truncate">
                {ProjectSummaryListSSR?.name + " - 요약"}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-0.5 flex-shrink-0">
              <div className="hidden xs:inline">
                <Image
                  src="/images/shell.svg"
                  alt="shell"
                  width={32}
                  height={32}
                  className="w-[26px] h-[26px] xs:w-[29px] xs:h-[29px] sm:w-[32px] sm:h-[32px] cursor-pointer transition-transform transform sm:hover:scale-125"
                  onClick={openShellModal}
                  priority
                />
              </div>
              <div className="hidden xs:inline">
                <Image
                  src="/images/chatbot.svg"
                  alt="chatbot"
                  width={44}
                  height={44}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4 cursor-pointer transition-transform transform sm:hover:scale-125"
                  onClick={openLogFileModal}
                  priority
                />
              </div>
              <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
            </div>
          </div>
          <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
            {ProjectSummaryListSSR?.description}
          </div>
          {ProjectSummaryListSSR && ProjectSummaryListSSR.summaries ? (
            ProjectSummaryListSSR.summaries.map((summary) => (
              <div key={summary.id}>
                <Container title={summary.time} link="">
                  <div
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                  >
                    {summary.content}
                  </div>
                </Container>
              </div>
            ))
          ) : (
            <EmptyBox title="요약" content="요약 내역이 존재하지 않습니다." />
          )}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-[6px] py-[2px] xs:px-[9px] xs:py-[3px] sm:px-[12px] sm:py-[4px] border-[0.5px] xs:border border-black rounded-md disabled:opacity-50"
            >
              이전
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cls(
                  "px-[6px] py-[2px] xs:px-[9px] xs:py-[3px] sm:px-[12px] sm:py-[4px] border-[0.5px] xs:border border-black rounded-md",
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-300"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-[6px] py-[2px] xs:px-[9px] xs:py-[3px] sm:px-[12px] sm:py-[4px] border-[0.5px] xs:border border-black rounded-md disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
        <TerminalModal
          isOpen={isShellModalOpen}
          onClose={closeShellModal}
          inputs={inputs}
          setInputs={setInputs}
          handleCommandSubmit={handleCommandSubmit}
        />
        <LogFileModal
          isOpen={isLogFileModalOpen}
          onClose={closeLogFileModal}
          logFileList={logFileListRef.current}
          option="chatbot"
        />
      </Layout>
    </>
  );
}
