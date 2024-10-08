import ButtonSmall from "@/components/button-small";
import Input from "@/components/input";
import Logo from "@/components/logo";
import ToggleButton from "@/components/toggle-button";
import useToggleButton from "@/hooks/commons/use-toggle-button";
import { useState } from "react";

export default function SignupStep3() {
  const { isToggled, handleToggle } = useToggleButton();
  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen h-[750px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-row justify-between items-center w-full max-w-[605px] px-1 -mt-4 xs:-mt-5 sm:-mt-6">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px]">
            알람 설정
          </div>
          <ToggleButton isToggled={isToggled} onToggle={handleToggle} />
        </div>
        <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
          <Input
            type="text"
            label="원격 서버 사용자"
            placeholder="원격 서버의 사용자명을 입력해주세요."
          />
          <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
            닉네임을 2자에서 8자 사이로 입력해주세요.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
          <Input
            type="text"
            label="호스트"
            placeholder="원격 서버의 IP 주소를 입력해주세요."
          />
          <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
            비밀번호가 유효하지 않습니다.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
          <Input
            type="text"
            label="프라이빗 키"
            placeholder="SSH perm 키를 업로드해주세요."
          />
          <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />{" "}
      </div>
    </div>
  );
}
