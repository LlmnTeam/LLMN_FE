import ConfirmModal from "@/components/confirm-modal";
import DropdownMenu from "@/components/dropdown-menu";
import EmptyBox from "@/components/empty-box";
import Layout from "@/components/layout";
import LogFileModal from "@/components/log-file-modal";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogDetail() {
  const [isLogFileModalOpen, setIsLogFileModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openLogFileModal = () => setIsLogFileModalOpen(true);
  const closeLogFileModal = () => setIsLogFileModalOpen(false);

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
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              Spring
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <Image
              src="/images/shell.svg"
              alt="shell"
              width={33}
              height={24}
              className="w-[27px] h-[20px] xs:w-[30px] xs:h-[22px] sm:w-[33px] sm:h-[24px]"
            />
            <div>
              <Image
                src="/images/chatbot.svg"
                alt="chatbot"
                width={44}
                height={44}
                className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4"
                onClick={openLogFileModal}
              />
              <LogFileModal
                isOpen={isLogFileModalOpen}
                onClose={closeLogFileModal}
              />
            </div>
            <div>
              <DropdownMenu
                options={["edit", "restart", "stop", "delete"]}
                onSelect={handleMenuSelect}
              />
              <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={closeConfirmModal}
                option={selectedOption}
              />
            </div>
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        <EmptyBox title={"요약"} content={"요약 내역이 존재하지 않습니다."} />
        <div className="flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 pt-2 pb-4 sm:px-10 sm:pt-3 sm:pb-5 mt-5 xs:mt-7">
          <div className="flex flex-row justify-between items-center relative w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              요약
            </span>
            <Image
              src="/images/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
            />
            <div className="absolute top-0.5 xs:top-0 right-[10%] text-[12px] xs:text-[14px] sm:text-[16px] text-[#979797] font-normal mt-1 xs:mt-2">
              2024.09.10_18 업데이트됨
            </div>
          </div>
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium">
            [🚨 이상 탐지 요약] <br />
            <span className="pl-2">- 탐지된 비정상 패턴: </span>
            <br />
            <span className="pl-4">
              1. 🚨 WebSocket 세션이 전혀 활성화되지 않음 (현재 세션 0개)
            </span>
            <br />
            <span className="pl-4">
              2. 🚨 인바운드 및 아웃바운드 채널의 활성 스레드가 0개로
              비정상적으로 낮음
            </span>
            <br />
            <span className="pl-2">- 권장 조치: </span>
            <br />
            <span className="pl-4">
              1. 💡 WebSocket 서버 설정 및 연결 상태 점검
            </span>
            <br />
            <span className="pl-4">2. 💡 채널 풀 및 스레드 설정 검토</span>
            <br />
            <span className="pl-4">
              3. 💡 클라이언트 연결 요청 확인 및 로그 추가 분석
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 pt-2 pb-4 sm:px-10 sm:pt-3 sm:pb-5 mt-5 xs:mt-7">
          <div className="flex flex-row justify-between items-center w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              최근 로그
            </span>
            <Image
              src="/images/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
            />
          </div>
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium break-all">
            [2024-09-10T10:59:04.342Z] INFO: 2024-09-10T19:59:04.339+09:00 INFO
            1 --- [MessageBroker-3] o.s.w.s.c.WebSocketMessageBrokerStats :
            WebSocketSession[0 current WS(0)-HttpStream(0)-HttpPoll(0), 0 total,
            0 closed abnormally (0 connect failure, 0 send limit, 0 transport
            error)], stompSubProtocol[processed
            CONNECT(0)-CONNECTED(0)-DISCONNECT(0)], stompBrokerRelay[1 sessions,
            ReactorNettyTcpClient[reactor.netty.tcp.TcpClientConnect@27b92d20]
            (available), processed CONNECT(1)-CONNECTED(1)-DISCONNECT(0)],
            inboundChannel[pool size = 0, active threads = 0, queued tasks = 0,
            completed tasks = 0], outboundChannel[pool size = 0, active threads
            = 0, queued tasks = 0, completed tasks = 0], sockJsScheduler[pool
            size = 6, active threads = 1, queued tasks = 8, completed tasks =
            21]
          </div>
        </div>
      </div>
    </Layout>
  );
}
