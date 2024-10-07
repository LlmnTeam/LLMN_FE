import ConfirmModal from "@/components/confirm-modal";
import Container from "@/components/container";
import DropdownMenu from "@/components/dropdown-menu";
import Layout from "@/components/layout";
import LogFileModal from "@/components/log-file-modal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LogSummary() {
  const [isLogFileModalOpen, setIsLogFileModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openLogFileModal = () => setIsLogFileModalOpen(true);
  const closeLogFileModal = () => setIsLogFileModalOpen(false);

  const handleMenuSelect = (option: string) => {
    setSelectedOption(option);
  };
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
              Spring - 요약
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
              />
            </div>
            <DropdownMenu
              options={["edit", "restart", "stop", "delete"]}
              onSelect={handleMenuSelect}
            />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          ForPaw BE의 스프링 프로젝트
        </div>
        <Container title="2024-09-12 19:00" link="">
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
        <Container title="2024-09-12 19:00" link="">
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
        <Container title="2024-09-12 19:00" link="">
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
        <Container title="2024-09-12 19:00" link="">
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
      </div>
    </Layout>
  );
}
