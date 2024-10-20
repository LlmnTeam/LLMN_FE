import Layout from "@/components/commons/layout";
import LogTable from "@/components/log/log-table";
import { LogPageProps, getProjectListSSR } from "@/ssr/log/log-ssr";
import { GetServerSideProps } from "next";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps<LogPageProps> =
  getProjectListSSR;

export default function Log({ ProjectListSSR }: LogPageProps) {
  console.log("ProjectListSSR: ", ProjectListSSR);

  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              프로젝트
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              54.180.244.93
            </span>
          </div>
          <div className="flex flex-row justify-start items-center gap-0.5 mr-1">
            <Image
              src="/images/rotate-right.svg"
              alt="rotate-right"
              width={31}
              height={34}
              className="w-[25px] h-[27px] xs:w-[28px] xs:h-[31px] sm:w-[31px] sm:h-[34px] cursor-pointer"
              onClick={() => {
                window.location.reload();
              }}
            />
          </div>
        </div>
        <LogTable ProjectListSSR={ProjectListSSR} />
      </div>
    </Layout>
  );
}
