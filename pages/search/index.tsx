import ButtonSmall from "@/components/button-small";
import ConfirmModal from "@/components/confirm-modal";
import Container from "@/components/container";
import DropdownMenu from "@/components/dropdown-menu";
import EmptyBox from "@/components/empty-box";
import Input from "@/components/input";
import InputSmall from "@/components/input-small";
import Layout from "@/components/layout";
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
        {/* <Container title="로그 파일" link="">
          <div></div>
        </Container> */}
      </div>
    </Layout>
  );
}
