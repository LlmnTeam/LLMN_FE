import { fetchProjectSummaryList } from "@/api/project/project-api";
import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import EmptyBox from "@/components/commons/empty-box";
import Layout from "@/components/commons/layout";
import LogFileModal from "@/components/project/log-file-modal";
import useLogFileModal from "@/hooks/project/use-log-file-modal";
import {
  ProjectSummaryListPageProps,
  getProjectSummaryListSSR,
} from "@/ssr/project/project-summary-ssr";
import { Nickname } from "@/types/login/login-type";
import { LogFileList, ProjectSummaryList } from "@/types/project/project-type";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<ProjectSummaryListPageProps> =
  getProjectSummaryListSSR;

export default function ProjectSummaryList({
  NicknameSSR,
  ProjectSummaryListSSR,
  LogFileListSSR,
}: ProjectSummaryListPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const [nickname, setNickname] = useState<Nickname | null>(NicknameSSR);
  const [projectSummaryList, setProjectSummaryList] =
    useState<ProjectSummaryList | null>(ProjectSummaryListSSR);
  const [logFileList, setLogFileList] = useState<LogFileList | null>(
    LogFileListSSR
  );
  const { isLogFileModalOpen, openLogFileModal, closeLogFileModal } =
    useLogFileModal();
  console.log("ProjectSummaryList: ", projectSummaryList);

  return (
    <Layout nickname={nickname?.nickName || null}>
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
              {projectSummaryList?.name}
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
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4 cursor-pointer"
                onClick={openLogFileModal}
              />
              <LogFileModal
                isOpen={isLogFileModalOpen}
                onClose={closeLogFileModal}
                logFileList={logFileList}
              />
            </div>
            <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          {projectSummaryList?.description}
        </div>
        {projectSummaryList && projectSummaryList.summaries ? (
          projectSummaryList.summaries.map((summary) => (
            <div key={summary.id}>
              <Container title={summary.time} link="">
                <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {summary.content}
                </div>
              </Container>
            </div>
          ))
        ) : (
          <EmptyBox title="요약" content="요약 내역이 존재하지 않습니다." />
        )}
      </div>
    </Layout>
  );
}
