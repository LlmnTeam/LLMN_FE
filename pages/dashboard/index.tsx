import Container from "@/components/commons/container";
import DropdownMenu from "@/components/commons/dropdown-menu";
import EmptyBox from "@/components/commons/empty-box";
import Layout from "@/components/commons/layout";
import Image from "next/image";
import { useState } from "react";

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import {
  fetchCloudInstanceList,
  fetchDashboardData,
} from "@/api/dashboard/dashboard-api";
import { CloudInstanceList, DashboardData } from "@/types/dashboard";
import MultiLineChart from "@/components/dashboard/multi-line-chart";

interface DashboardPageProps {
  DashboardDataSSR: DashboardData | null;
  CloudInstanceListSSR: CloudInstanceList | null;
}

// 타입스크립트로 변환된 getServerSideProps 함수
export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<DashboardPageProps>> => {
  const accessToken = context.req.cookies?.accessToken || "";

  let DashboardDataSSR: DashboardData | null = null;
  let CloudInstanceListSSR: CloudInstanceList | null = null;

  if (accessToken) {
    DashboardDataSSR = await fetchDashboardData(accessToken);
    CloudInstanceListSSR = await fetchCloudInstanceList(accessToken);
  }

  return {
    props: {
      DashboardDataSSR,
      CloudInstanceListSSR,
    },
  };
};

export default function Dashboard({
  DashboardDataSSR,
  CloudInstanceListSSR,
}: DashboardPageProps) {
  console.log("DashboardDataSSR: ", DashboardDataSSR);
  console.log("CloudInstanceListSSR: ", CloudInstanceListSSR);
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              대시보드
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              {DashboardDataSSR?.ip}
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
            <DropdownMenu
              options={["change"]}
              cloudInstanceList={CloudInstanceListSSR}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-4 w-full rounded-lg border border-[#E5E7EB] shadow-md px-6 py-2 sm:px-10 sm:py-3 mt-5 xs:mt-7">
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              CPU 사용량
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              {DashboardDataSSR?.cpuUsage}
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              메모리 사용량
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              {DashboardDataSSR?.memoryUsage}
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              네트워크 수신
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              {DashboardDataSSR?.networkReceived}
            </span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <span className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold w-[90px] xs:w-[100px] sm:w-[110px]">
              네트워크 송신
            </span>
            <span className="text-[11px] xs:text-[12px] sm:text-[14px] font-normal">
              {DashboardDataSSR?.networkSent}
            </span>
          </div>
        </div>
        {DashboardDataSSR?.summary ? (
          <Container title="요약" link="">
            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {DashboardDataSSR?.summary}
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
            {DashboardDataSSR ? (
              <MultiLineChart
                data={DashboardDataSSR.cpuHistory}
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
            {DashboardDataSSR ? (
              <MultiLineChart
                data={DashboardDataSSR.memoryHistory}
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
            {DashboardDataSSR ? (
              <MultiLineChart
                data={DashboardDataSSR.networkInHistory}
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
            {DashboardDataSSR ? (
              <MultiLineChart
                data={DashboardDataSSR.networkOutHistory}
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
    </Layout>
  );
}
