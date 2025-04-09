// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRef } from "react";
import Head from "next/head";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  DashboardPageProps,
  getDashboardSSR,
} from "@/src/ssr/dashboard/dashboard-ssr";
import type { Nickname } from "@/src/types/login/login-type";
import type {
  Dashboard,
  CloudInstanceDataList,
} from "@/src/types/dashboard/dashboard-type";

// 프로젝트 내부 훅과 유틸리티 함수
import useShellModal from "@/src/hooks/project/use-shell-modal";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import Container from "@/src/components/commons/container";
import EmptyBox from "@/src/components/commons/empty-box";
import MultiLineChart from "@/src/components/dashboard/multi-line-chart";
import TerminalModal from "@/src/components/project/terminal-modal";

export const getServerSideProps: GetServerSideProps<DashboardPageProps> =
  getDashboardSSR;

export default function Dashboard({
  NicknameSSR,
  DashboardSSR,
  CloudInstanceListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: DashboardPageProps) {
  const {
    isShellModalOpen,
    openShellModal,
    closeShellModal,
    inputs,
    setInputs,
    handleCommandSubmit,
  } = useShellModal();

  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const dashboardRef = useRef<Dashboard | null>(DashboardSSR);
  const cloudInstanceListRef = useRef<CloudInstanceDataList | null>(
    CloudInstanceListSSR
  );

  return (
    <>
      <Head>
        <title>LLMN - Dashboard</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                대시보드
              </span>
              <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
                {dashboardRef.current?.ip}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-0.5">
              <Image
                src="/images/shell.svg"
                alt="shell"
                width={32}
                height={32}
                className="w-[26px] h-[26px] xs:w-[29px] xs:h-[29px] sm:w-[32px] sm:h-[32px] cursor-pointer transition-transform transform sm:hover:scale-125"
                onClick={openShellModal}
                priority
              />
              <DropdownMenu
                options={["change"]}
                cloudInstanceList={cloudInstanceListRef.current}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-4 w-full rounded-lg border border-[#E5E7EB] shadow-md px-6 py-2 sm:px-10 sm:py-3 mt-5 xs:mt-7">
            <div className="flex flex-row justify-start items-center">
              <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
                CPU 사용량
              </span>
              <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
                {dashboardRef.current?.cpuUsage}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
                메모리 사용량
              </span>
              <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
                {dashboardRef.current?.memoryUsage}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
                네트워크 수신
              </span>
              <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
                {dashboardRef.current?.networkReceived}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
                네트워크 송신
              </span>
              <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
                {dashboardRef.current?.networkSent}
              </span>
            </div>
          </div>
          {dashboardRef.current?.summary ? (
            <Container title="요약" link="">
              <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {dashboardRef.current?.summary}
              </div>
            </Container>
          ) : (
            <EmptyBox
              title="요약"
              content="인스턴스가 작동중이지 않거나 SSH 연결에 실패하였습니다."
              type="dashboard"
            />
          )}
          <div className="flex flex-wrap gap-x-[4%] gap-y-6 xs:gap-y-7 mt-6 xs:mt-7 sm:mt-8">
            <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 p-[3%]">
              <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold ml-[3%] mb-[2%]">
                CPU
              </span>
              {dashboardRef.current ? (
                <MultiLineChart
                  data={dashboardRef.current.cpuHistory}
                  lines={[
                    { key: "cpuUsage", color: "#374151", label: "CPU Usage" },
                  ]}
                />
              ) : null}
            </div>
            <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 p-[3%]">
              <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold ml-[3%] mb-[2%]">
                Memory
              </span>
              {dashboardRef.current ? (
                <MultiLineChart
                  data={dashboardRef.current.memoryHistory}
                  lines={[
                    {
                      key: "memoryUsage",
                      color: "#374151",
                      label: "Memory Usage",
                    },
                  ]}
                />
              ) : null}
            </div>
            <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 p-[3%]">
              <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold ml-[3%] mb-[2%]">
                Network - In
              </span>
              {dashboardRef.current ? (
                <MultiLineChart
                  data={dashboardRef.current.networkInHistory}
                  lines={[
                    {
                      key: "networkReceived",
                      color: "#374151",
                      label: "Network Received",
                    },
                  ]}
                  isNetworkData
                />
              ) : null}
            </div>
            <div className="md:w-[48%] flex flex-col justify-start items-start w-full rounded-lg border border-[#E5E7EB] shadow-md gap-2 p-[3%]">
              <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold ml-[3%] mb-[2%]">
                Network - Out
              </span>
              {dashboardRef.current ? (
                <MultiLineChart
                  data={dashboardRef.current.networkOutHistory}
                  lines={[
                    {
                      key: "networkSent",
                      color: "#374151",
                      label: "Network Sent",
                    },
                  ]}
                  isNetworkData
                />
              ) : null}
            </div>
          </div>
        </div>
        <TerminalModal
          isOpen={isShellModalOpen}
          onClose={closeShellModal}
          inputs={inputs}
          setInputs={setInputs}
          handleCommandSubmit={handleCommandSubmit}
        />
      </Layout>
    </>
  );
}
