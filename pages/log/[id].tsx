import ConfirmModal from "@/components/confirm-modal";
import Container from "@/components/container";
import DropdownMenu from "@/components/dropdown-menu";
import EmptyBox from "@/components/empty-box";
import Layout from "@/components/layout";
import LogFileModal from "@/components/log-file-modal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LogDetail() {
  const [isLogFileModalOpen, setIsLogFileModalOpen] = useState(false);

  const openLogFileModal = () => setIsLogFileModalOpen(true);
  const closeLogFileModal = () => setIsLogFileModalOpen(false);
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
              Spring
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
                onClose={closeLogFileModal}
              />
            </div>
            <DropdownMenu options={["edit", "restart", "stop", "delete"]} />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        <EmptyBox title={"요약"} content={"요약 내역이 존재하지 않습니다."} />
        <Container title="요약" link="/log/1/summary">
          [🚨 이상 탐지 요약] <br />
          <span className="pl-2">- 탐지된 비정상 패턴: </span>
          <br />
          <span className="pl-4">
            1. 🚨 WebSocket 세션이 전혀 활성화되지 않음 (현재 세션 0개)
          </span>
          <br />
          <span className="pl-4">
            2. 🚨 인바운드 및 아웃바운드 채널의 활성 스레드가 0개로 비정상적으로
            낮음
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
        </Container>
        <Container title="최근 로그" link="/log/1/message">
          [2024-09-10T10:59:04.342Z] INFO: 2024-09-10T19:59:04.339+09:00 INFO 1
          --- [MessageBroker-3] o.s.w.s.c.WebSocketMessageBrokerStats :
          WebSocketSession[0 current WS(0)-HttpStream(0)-HttpPoll(0), 0 total, 0
          closed abnormally (0 connect failure, 0 send limit, 0 transport
          error)], stompSubProtocol[processed
          CONNECT(0)-CONNECTED(0)-DISCONNECT(0)], stompBrokerRelay[1 sessions,
          ReactorNettyTcpClient[reactor.netty.tcp.TcpClientConnect@27b92d20]
          (available), processed CONNECT(1)-CONNECTED(1)-DISCONNECT(0)],
          inboundChannel[pool size = 0, active threads = 0, queued tasks = 0,
          completed tasks = 0], outboundChannel[pool size = 0, active threads =
          0, queued tasks = 0, completed tasks = 0], sockJsScheduler[pool size =
          6, active threads = 1, queued tasks = 8, completed tasks = 21]
        </Container>
      </div>
    </Layout>
  );
}
