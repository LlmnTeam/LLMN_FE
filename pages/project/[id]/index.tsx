// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  ProjectDetailPageProps,
  getProjectDetailSSR,
} from "@/src/ssr/project/project-detail-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { ProjectDetail, LogFileList } from "@/src/types/project/project-type";

// 프로젝트 내부 훅과 유틸리티 함수
import useShellModal from "@/src/hooks/project/use-shell-modal";
import useLogFileModal from "@/src/hooks/project/use-log-file-modal";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import Container from "@/src/components/commons/container";
import EmptyBox from "@/src/components/commons/empty-box";
import TerminalModal from "@/src/components/project/terminal-modal";
import LogFileModal from "@/src/components/project/log-file-modal";

export const getServerSideProps: GetServerSideProps<ProjectDetailPageProps> =
  getProjectDetailSSR;

export default function ProjectDetail({
  NicknameSSR,
  ProjectDetailSSR,
  LogFileListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ProjectDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;

  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const projectDetailRef = useRef<ProjectDetail | null>(ProjectDetailSSR);
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

  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <>
      <Head>
        <title>LLMN - {projectDetailRef.current?.name}</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <Link href="/project">
                <Image
                  src="/images/back.svg"
                  alt="back"
                  width={45}
                  height={45}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px] cursor-pointer"
                  priority
                />
              </Link>
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
                {projectDetailRef.current?.name}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-0.5">
              <Image
                src="/images/shell.svg"
                alt="shell"
                width={32}
                height={32}
                className="w-[26px] h-[26px] xs:w-[29px] xs:h-[29px] sm:w-[32px] sm:h-[32px] cursor-pointer transition-transform transform sm:hover:scale-125"
                onClick={openShellModal}
                priority
              />
              <div>
                <Image
                  src="/images/chatbot.svg"
                  alt="chatbot"
                  width={44}
                  height={44}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4 cursor-pointer transition-transform transform sm:hover:scale-125"
                  onClick={() => {
                    setSelectedOption("chatbot");
                    openLogFileModal();
                  }}
                  priority
                />
              </div>
              <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
            </div>
          </div>
          <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
            {projectDetailRef.current?.description}
          </div>
          {projectDetailRef.current?.summaryContent ? (
            <Container
              title="요약"
              link={`/project/${id}/summaries?page=0`}
              update={`${
                projectDetailRef.current?.summaryUpdateDate?.split(" ")[0]
              } 업데이트`}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {projectDetailRef.current?.summaryContent}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"요약"}
              content={"요약 내역이 존재하지 않습니다."}
            />
          )}
          {projectDetailRef.current?.logContent ? (
            <Container
              title="최근 로그"
              link=""
              update=""
              action={() => {
                setSelectedOption("log");
                openLogFileModal();
              }}
            >
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {ProjectDetailSSR?.logContent}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title={"최근 로그"}
              content={"로그가 존재하지 않습니다."}
            />
          )}
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
          option={selectedOption}
        />
      </Layout>
    </>
  );
}
