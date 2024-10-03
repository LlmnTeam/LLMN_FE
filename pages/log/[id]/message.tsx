import DropdownMenu from "@/components/dropdown-menu";
import Layout from "@/components/layout";
import LogFileModal from "@/components/log-file-modal";
import LogTable from "@/components/log-table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LogMessage() {
  const [isLogFileModalOpen, setIsLogFileModalOpen] = useState(false);

  const openLogFileModal = () => setIsLogFileModalOpen(true);
  const closeLogFileModal = () => setIsLogFileModalOpen(false);
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center">
            <Link href="/log/1">
              <Image
                src="/images/back.svg"
                alt="back"
                width={45}
                height={45}
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
              />
            </Link>
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
              Spring - 로그 메세지
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <div>
              <Image
                src="/images/shell.svg"
                alt="shell"
                width={33}
                height={24}
                className="w-[27px] h-[20px] xs:w-[30px] xs:h-[22px] sm:w-[33px] sm:h-[24px]"
              />
            </div>
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
            <Image
              src="/images/download.svg"
              alt="download"
              width={35}
              height={35}
              className="w-[30px] h-[30px] xs:w-[33px] xs:h-[33px] sm:w-[35px] sm:h-[35px] ml-2 sm:ml-3"
            />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        <div className="flex flex-col justify-start items-start w-full min-h-[210px] xs:min-h-[260px] sm:min-h-[310px] rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 pt-2 pb-4 sm:px-10 sm:pt-3 sm:pb-5 mt-5 xs:mt-7">
          <div className="flex flex-row justify-between items-center w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              mongo-log-2024-09-10_16.txt
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
            <br />
            <br />
            [2024-09-10T11:29:04.365Z] INFO: 2024-09-10T20:29:04.360+09:00 INFO
            1 --- [MessageBroker-4] o.s.w.s.c.WebSocketMessageBrokerStats :
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
            23]
            <br />
            <br />
            [2024-09-10T11:51:54.723Z] UNKNOWN: Hibernate: select
            p1_0.id,p1_0.answer_num,p1_0.comment_num,p1_0.content,p1_0.created_date,p1_0.group_id,p1_0.hot_point,p1_0.is_blocked,p1_0.post_id,p1_0.post_type,p1_0.read_cnt,p1_0.removed_at,p1_0.title,p1_0.updated_date,p1_0.user_id
            from post_tb p1_0 where p1_0.created_date between ? and ? and
            p1_0.post_type=? and p1_0.removed_at is null
          </div>
        </div>
      </div>
    </Layout>
  );
}
