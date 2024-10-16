import ButtonSmall from "@/components/commons/button-small";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import useInstanceCheck from "@/hooks/commons/use-instance-check";
import { cls } from "@/libs/class-utils";
import { useState } from "react";

export default function SignupStep3() {
  const {
    remoteName,
    remoteHost,
    remoteKeyPath,
    remoteNameMsg,
    remoteHostMsg,
    isValidRemoteName,
    isValidRemoteHost,
    handleRemoteNameChange,
    handleRemoteHostChange,
    handleRemoteKeyPathChange,
  } = useInstanceCheck();

  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[680px] xs:h-[720px] sm:h-[760px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-col justify-start items-center relative w-full mt-8 xs:mt-9 sm:mt-10">
          <Input
            type="text"
            label="원격 서버 사용자"
            placeholder="원격 서버의 사용자명을 입력해주세요."
            value={remoteName}
            onChange={handleRemoteNameChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
              isValidRemoteName ? "text-blue-400" : "text-red-400"
            )}
          >
            {remoteNameMsg}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-6 xs:mt-7 sm:mt-8">
          <Input
            type="text"
            label="호스트"
            placeholder="원격 서버의 IP 주소를 입력해주세요."
            value={remoteHost}
            onChange={handleRemoteHostChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
              isValidRemoteHost ? "text-blue-400" : "text-red-400"
            )}
          >
            {remoteHostMsg}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-6 xs:mt-7 sm:mt-8">
          <Input
            type="text"
            label="프라이빗 키"
            placeholder="SSH pem 키를 업로드해주세요."
            value={remoteKeyPath}
            onChange={handleRemoteKeyPathChange}
            readOnly
          />
          {/* <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5 text-gray-400"
            )}
          >
            내용을 입력하세요.
          </div> */}
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6 pb-[15vh]">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />{" "}
      </div>
    </div>
  );
}
