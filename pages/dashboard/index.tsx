import Container from "@/components/container";
import DropdownMenu from "@/components/dropdown-menu";
import Layout from "@/components/layout";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              대시보드
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              54.180.244.93
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
            <DropdownMenu options={["change"]} />
          </div>
        </div>
        <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-4 w-full rounded-lg border border-[#E5E7EB] shadow-md px-6 py-2 sm:px-10 sm:py-3 mt-5 xs:mt-7">
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              CPU 사용량
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              52%
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              메모리 사용량
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              32%
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              네트워크 수신
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              0.02MB
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              네트워크 송신
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              0.03MB
            </span>
          </div>
        </div>
        <Container title="요약" link="">
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium">
            [⚠️ Warning] 2024-09-10 13:45: CPU 사용량이 85% 이상입니다. 시스템
            점검이 필요합니다.
          </div>
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium">
            [❗ Critical] 2024-09-10 13:30: 네트워크 수신량이 비정상적으로
            높습니다. 원인 분석을 권장합니다.
          </div>
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium">
            [⚠️ Warning] 2024-09-10 13:15: 평소보다 네트워크 트래픽이
            비정상적으로 높습니다. 이전 7일 평균보다 50% 높은 트래픽이
            감지되었습니다.
          </div>
          <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-medium">
            [❗ Critical] 2024-09-10 13:30: 매일 오전 10시에 메모리 사용량이
            급증합니다. 해당 시간대에 불필요한 작업을 줄이거나 리소스 할당을
            조정하는 것을 권장합니다.
          </div>
        </Container>
        <div className="flex flex-wrap gap-x-[4%] gap-y-6 xs:gap-y-7 mt-6 xs:mt-7 sm:mt-8">
          <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 py-4 sm:px-10 sm:py-5">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              CPU
            </span>
            <Image
              src="/images/graph.png"
              alt="graph"
              layout="responsive"
              width={427}
              height={211}
            />
          </div>
          <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 py-4 sm:px-10 sm:py-5">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              Memory
            </span>
            <Image
              src="/images/graph.png"
              alt="graph"
              layout="responsive"
              width={427}
              height={211}
            />
          </div>
          <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 py-4 sm:px-10 sm:py-5">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              Network - In
            </span>
            <Image
              src="/images/graph.png"
              alt="graph"
              layout="responsive"
              width={427}
              height={211}
            />
          </div>
          <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 py-4 sm:px-10 sm:py-5">
            <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
              Network - Out
            </span>
            <Image
              src="/images/graph.png"
              alt="graph"
              layout="responsive"
              width={427}
              height={211}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
