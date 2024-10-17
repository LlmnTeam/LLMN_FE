import ButtonSmall from "@/components/commons/button-small";
import InstanceModal from "@/components/commons/instance-modal";
import Logo from "@/components/commons/logo";
import InstanceList from "@/components/login/instance-list";
import useInstanceModal from "@/hooks/commons/use-instance-modal";
import useSSHInfos from "@/hooks/commons/use-ssh-infos";
import Image from "next/image";
import { useState } from "react";

export default function SignupStep4() {
  const {
    sshInfos,
    saveSSHInfosToSession,
    getSSHInfosFromSession,
    addSSHInfo,
    removeSSHInfo,
    resetSSHInfos,
  } = useSSHInfos();

  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();

  console.log("sshInfos: ", sshInfos);

  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[680px] xs:h-[720px] sm:h-[760px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-col justify-start items-center relative w-full max-w-[605px] h-[410px] xs:h-[430px] sm:h-[440px] rounded-md shadow-md border border-[#E5E7EB] gap-2 xs:gap-3 sm:gap-4 mt-1 xs:mt-2 sm:mt-3 overflow-hidden">
          <div className="flex flex-row justify-center items-center w-full bg-white px-1 mb-2 xs:mb-3 sm:mb-4 pt-3 xs:pt-4 sm:pt-5">
            <div className="text-[22px] xs:text-[24px] sm:text-[26px] font-bold">
              클라우드 인스턴스
            </div>
            <div className="absolute top-5.5 xs:top-6 sm:top-7 right-6 xs:right-7 sm:right-8">
              <Image
                src="/images/add-1.svg"
                alt="add-1"
                width={25}
                height={22}
                className="w-[19px] h-[16px] xs:w-[22px] xs:h-[19px] sm:w-[25px] sm:h-[22px] cursor-pointer"
                onClick={() => openInstanceModal("add")}
              />
            </div>
          </div>
          <InstanceList sshInfos={sshInfos} />
          <div className="w-full text-[13px] xs:text-[15px] sm:text-[17px] text-center px-3 xs:px-4 sm:px-5 py-3 bg-white text-gray-400">
            메인으로 모티터링할 인스턴스를 선택해주세요
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6 pb-[15vh]">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />
      </div>
      <InstanceModal
        isOpen={isInstanceModalOpen}
        onClose={closeInstanceModal}
        option={selectedOption}
      />
    </div>
  );
}
