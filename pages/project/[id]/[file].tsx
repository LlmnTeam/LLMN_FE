// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  ProjectLogMessagePageProps,
  getProjectLogMessageSSR,
} from "@/src/ssr/project/project-log-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { LogFileList, LogMessage } from "@/src/types/project/project-type";
import { downloadLogFile } from "@/src/api/project/project-api";

// 프로젝트 내부 훅과 유틸리티 함수
import useShellModal from "@/src/hooks/project/use-shell-modal";
import useLogFileModal from "@/src/hooks/project/use-log-file-modal";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import Container from "@/src/components/commons/container";
import TerminalModal from "@/src/components/project/terminal-modal";
import LogFileModal from "@/src/components/project/log-file-modal";

export const getServerSideProps: GetServerSideProps<ProjectLogMessagePageProps> =
  getProjectLogMessageSSR;

export default function LogMessage({
  NicknameSSR,
  LogMessageSSR,
  LogFileListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ProjectLogMessagePageProps) {
  const router = useRouter();
  const id = router.query.id;
  const file = router.query.file as string;

  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const logMessageRef = useRef<LogMessage | null>(LogMessageSSR);
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

  const handleDownloadButton = async () => {
    if (!file) return;
    await downloadLogFile(file);
  };
  return (
    <>
      <Head>
        <title>LLMN - {logMessageRef.current?.name} Log Message</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
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
                {logMessageRef.current?.name + " - 로그 메세지"}
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
              <Image
                src="/images/download.svg"
                alt="download"
                width={35}
                height={35}
                className="w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] sm:w-[35px] sm:h-[35px] ml-2 sm:ml-3 cursor-pointer transition-transform transform sm:hover:scale-125"
                onClick={handleDownloadButton}
                priority
              />
            </div>
          </div>
          <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
            {logMessageRef.current?.description}
          </div>
          <Container title={logMessageRef.current?.fileName || ""} link="">
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {logMessageRef.current?.logMessage}
            </div>
          </Container>
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
