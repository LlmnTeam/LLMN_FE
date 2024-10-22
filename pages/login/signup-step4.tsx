import ButtonSmall from "@/components/commons/button-small";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import useInstanceModal from "@/hooks/commons/use-instance-modal";
import useOpenAIKeyCheck from "@/hooks/commons/use-open-ai-key-check";
import { cls } from "@/utils/class-utils";
import { useState } from "react";

export default function SignupStep4() {
  const { openAIKey, isVaildOpenAIKey, openAIKeyMsg, handleOpenAIKeyChange } =
    useOpenAIKeyCheck();

  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();
  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[680px] xs:h-[720px] sm:h-[760px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] pb-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="w-full max-w-[605px]">
          <div className="flex flex-col justify-start items-center relative w-full mt-8 xs:mt-9 sm:mt-10">
            <Input
              type="text"
              label="Open AI Key"
              placeholder="***************************"
              value={openAIKey}
              onChange={handleOpenAIKeyChange}
            />
            <div
              className={cls(
                "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                isVaildOpenAIKey ? "text-blue-400" : "text-red-400"
              )}
            >
              {openAIKeyMsg}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full rounded-md bg-[#F8F9FA] border border-[#E4E4E7] gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 mt-8 xs:mt-9 sm:mt-10">
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
