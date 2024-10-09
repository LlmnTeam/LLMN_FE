import Image from "next/image";
import { useRef } from "react";
import InputSmall from "./input-small";
import ButtonSmall from "./button-small";

interface InputProps {}

export default function SearchInput() {
  return (
    <>
      <div className="flex flex-row justify-start items-center w-full mt-5 xs:mt-6 sm:mt-8">
        <div className="w-[60px] xs:w-[70px] sm:w-[80px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold flex-shrink-0">
          기간
        </div>
        <div className="flex flex-row justify-start items-center w-full gap-1 xs:gap-2 sm:gap-3 pr-[65px] xs:pr-[83px] sm:pr-[102px] max-w-[800px]">
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
        <div className="w-[60px] xs:w-[70px] sm:w-[80px] text-[16px] xs:text-[18px] sm:text-[20px] font-bold flex-shrink-0">
          키워드
        </div>
        <div className="flex flex-row justify-start items-center gap-3 xs:gap-4 sm:gap-5 w-full max-w-[800px]">
          <InputSmall
            type="text"
            label=""
            placeholder="검색할 단어를 입력하세요."
            maxWidth="600px"
          />
          {/* <ButtonSmall label="검색" /> */}
          <div className="flex flex-row justify-center items-center relative flex-shrink-0">
            <button className="h-[30px] xs:h-[40px] sm:h-[50px] text-[12px] xs:text-[16px] sm:text-[20px] rounded-md bg-[#0F172A] font-semibold px-[16px] xs:px-[20px] sm:px-[24px] text-white">
              검색
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
