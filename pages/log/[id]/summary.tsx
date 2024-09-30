import DropdownMenu from "@/components/dropdown-menu";
import Layout from "@/components/layout";
import LogTable from "@/components/log-table";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogSummary() {
  const handleMenuSelect = (option: string) => {
    console.log("Selected option:", option);
  };
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              Spring - 요약
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5">
            <Image
              src="/images/box-icon.svg"
              alt="box-icon"
              width={33}
              height={24}
              className="w-[27px] h-[20px] xs:w-[30px] xs:h-[22px] sm:w-[33px] sm:h-[24px]"
            />
            <Image
              src="/images/log-list.svg"
              alt="log-list"
              width={44}
              height={44}
              className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] ml-3 xs:ml-4"
            />
            <DropdownMenu
              options={[
                "수정하기",
                "컨테이너 재시작",
                "컨테이너 종료",
                "삭제하기",
              ]}
              onSelect={handleMenuSelect}
            />
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2">
          ForPaw BE의 스프링 프로젝트
        </div>
        <div className="flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 pt-2 pb-4 sm:px-10 sm:pt-3 sm:pb-5 mt-5 xs:mt-7">
          <div className="flex flex-row justify-between items-center relative w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              2024-09-12 19:00
            </span>
            <Image
              src="/images/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
            />
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
          <div className="flex flex-row justify-between items-center relative w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              2024-09-12 19:00
            </span>
            <Image
              src="/images/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
            />
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
          <div className="flex flex-row justify-between items-center relative w-full mb-1 xs:mb-2">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              2024-09-12 19:00
            </span>
            <Image
              src="/images/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
            />
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
      </div>
    </Layout>
  );
}
