import Container from "@/components/commons/container";
import Layout from "@/components/commons/layout";
import LogFileModal from "@/components/project/log-file-modal";
import useLogFileModal from "@/hooks/project/use-log-file-modal";
import {
  ProjectLogMessagePageProps,
  getProjectLogMessageSSR,
} from "@/ssr/project/project-log-ssr";
import { Nickname } from "@/types/login/login-type";
import type { LogFileList, LogMessage } from "@/types/project/project-type";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

export const getServerSideProps: GetServerSideProps<ProjectLogMessagePageProps> =
  getProjectLogMessageSSR;

export default function LogMessage({
  NicknameSSR,
  LogMessageSSR,
  LogFileListSSR,
}: ProjectLogMessagePageProps) {
  const router = useRouter();
  const { id } = router.query;
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const logMessageRef = useRef<LogMessage | null>(LogMessageSSR);
  const logFileListRef = useRef<LogFileList | null>(LogFileListSSR);
  const { isLogFileModalOpen, openLogFileModal, closeLogFileModal } =
    useLogFileModal();
  return (
    <Layout nickname={nicknameRef.current?.nickName || null}>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center">
            <Link href={`/project/${id}`}>
              <Image
                src="/images/back.svg"
                alt="back"
                width={45}
                height={45}
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
              />
            </Link>
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
              {logMessageRef.current?.name + " - 로그 메세지"}
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <div>
              <Image
                src="/images/shell.svg"
                alt="shell"
                width={33}
                height={24}
                className="w-[26px] h-[19px] xs:w-[30px] xs:h-[22px] sm:w-[33px] sm:h-[24px]"
              />
            </div>
            <div>
              <Image
                src="/images/chatbot.svg"
                alt="chatbot"
                width={44}
                height={44}
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4"
                onClick={openLogFileModal}
              />
              <LogFileModal
                isOpen={isLogFileModalOpen}
                onClose={closeLogFileModal}
                logFileList={logFileListRef.current}
                option="chatbot"
              />
            </div>
            <Image
              src="/images/download.svg"
              alt="download"
              width={35}
              height={35}
              className="w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] sm:w-[35px] sm:h-[35px] ml-2 sm:ml-3"
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
    </Layout>
  );
}
