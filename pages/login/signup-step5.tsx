import ButtonSmall from "@/components/button-small";
import Input from "@/components/input";
import Logo from "@/components/logo";
import useInstanceModal from "@/hooks/commons/use-instance-modal";
import { useState } from "react";

export default function SignupStep4() {
  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();
  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen h-[750px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] pb-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="w-full max-w-[605px]">
          <div className="mt-6 xs:mt-8 sm:mt-10">
            <Input
              type="text"
              label="Open AI Key"
              placeholder="***************************"
              maxWidth="605px"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full rounded-md bg-[#F8F9FA] border border-[#E4E4E7] gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 mt-6 xs:mt-7 sm:mt-8">
            <ul className="list-disc pl-5">
              <li>OpenAI API 키는 openai.com에서 발급받으세요.</li>
              <li>API 키를 입력하지 않으면 일부 기능이 제한될 수 있습니다.</li>
              <li>
                과도한 API 사용은 추가 요금이 발생할 수 있으니 주의하세요.
              </li>
              <li>
                장기간 사용하지 않을 경우, 키를 비활성화하는 것을 권장합니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />
      </div>
    </div>
  );
}
