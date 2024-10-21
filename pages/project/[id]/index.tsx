import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import EmptyBox from "@/components/commons/empty-box";
import Layout from "@/components/commons/layout";
import ChatbotModal from "@/components/project/chatbot-modal";
import LogFileModal from "@/components/project/log-file-modal";
import useChatbotModal from "@/hooks/project/use-chatbot-modal";
import useLogFileModal from "@/hooks/project/use-log-file-modal";
import {
  LogDetailPageProps,
  getProjectDetailSSR,
} from "@/ssr/project/project-detail";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<LogDetailPageProps> =
  getProjectDetailSSR;

export default function LogDetail({ ProjectDetailSSR }: LogDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  console.log("id: ", id);
  const { isChatbotModalOpen, openChatbotModal, closeChatbotModal } =
    useChatbotModal();
  const { isLogFileModalOpen, openLogFileModal, closeLogFileModal } =
    useLogFileModal();

  console.log("ProjectDetailSSR: ", ProjectDetailSSR);
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center">
            <Link href="/log">
              <Image
                src="/images/back.svg"
                alt="back"
                width={45}
                height={45}
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
              />
            </Link>
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
              {ProjectDetailSSR?.name}
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <Image
              src="/images/shell.svg"
              alt="shell"
              width={33}
              height={24}
              className="w-[26px] h-[19px] xs:w-[30px] xs:h-[22px] sm:w-[33px] sm:h-[24px]"
            />
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
                onClose={() => {
                  closeLogFileModal();
                  openChatbotModal();
                }}
              />
              <ChatbotModal
                isOpen={isChatbotModalOpen}
                onClose={closeChatbotModal}
              />
            </div>
            <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          {ProjectDetailSSR?.description}
        </div>
        {ProjectDetailSSR?.summaryContent ? (
          <Container
            title="요약"
            link={`/log/${id}/summary`}
            update={`${
              ProjectDetailSSR?.summaryUpdateDate?.split(" ")[0]
            } 업데이트`}
          >
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {ProjectDetailSSR?.summaryContent}
            </div>
          </Container>
        ) : (
          <EmptyBox title={"요약"} content={"요약 내역이 존재하지 않습니다."} />
        )}
        {ProjectDetailSSR?.logContent ? (
          <Container title="최근 로그" link={`/log/${id}/message`} update="">
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {ProjectDetailSSR?.logContent}
            </div>
          </Container>
        ) : (
          <EmptyBox title={"최근 로그"} content={"로그가 존재하지 않습니다."} />
        )}
      </div>
    </Layout>
  );
}
