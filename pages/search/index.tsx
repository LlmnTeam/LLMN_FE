import ButtonSmall from "@/components/button-small";
import ConfirmModal from "@/components/confirm-modal";
import Container from "@/components/container";
import DropdownMenu from "@/components/dropdown-menu";
import EmptyBox from "@/components/empty-box";
import Input from "@/components/input";
import InputSmall from "@/components/input-small";
import Layout from "@/components/layout";
import LogFile from "@/components/log-file";
import Image from "next/image";
import { useState } from "react";

export default function Insight() {
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              검색
            </span>
          </div>
        </div>
        <div className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold mt-1 xs:mt-2 pl-1">
          mongo
        </div>
        <div className="flex flex-row justify-start items-center w-full mt-5 xs:mt-6 sm:mt-8">
          <span className="w-[70px] xs:w-[80px] sm:w-[90px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold">
            기간
          </span>
          <div className="flex flex-row justify-start items-center w-full gap-1 xs:gap-2 sm:gap-3 pr-[87px] xs:pr-[95px] sm:pr-[102px] max-w-[800px]">
            <InputSmall
              type="text"
              label=""
              placeholder="시작일"
              maxWidth="282px"
            />
            <span className="text-[16px] xs:text-[18px] sm:text-[20px]">~</span>
            <InputSmall
              type="text"
              label=""
              placeholder="종료일"
              maxWidth="282px"
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center w-full mt-3 xs:mt-4 sm:mt-5">
          <span className="w-[70px] xs:w-[80px] sm:w-[90px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold">
            키워드
          </span>
          <div className="flex flex-row justify-start items-center gap-3 xs:gap-4 sm:gap-5 w-full max-w-[800px]">
            <InputSmall
              type="text"
              label=""
              placeholder="검색할 단어를 입력하세요."
              maxWidth="600px"
            />
            <ButtonSmall label="검색" />
          </div>
        </div>
        <EmptyBox
          title="로그 파일"
          content="파일이 존재하지 않습니다"
          type="log"
        />
        <EmptyBox title="인사이트 기록" content="기록이 존재하지 않습니다" />
        <Container title="로그 파일" type="log">
          <div className="grid grid-cols-3 w-full gap-0 border-[#E9ECEF]">
            {/* 첫 번째 행 */}
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>

            {/* 두 번째 행 */}
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-b gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>

            {/* 세 번째 행 */}
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] border-r gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
            <div className="flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6">
              <LogFile filename="mongo-log-2024-09-10_12.txt" />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}
