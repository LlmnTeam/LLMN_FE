import React, { ReactNode, useState } from "react";
import Input from "./input";
import ButtonSmall from "./button-small";
import InputSmall from "./input-small";
import useInstanceCheck from "@/hooks/commons/use-instance-check";
import { cls } from "@/utils/class-utils";
import { SshInfo } from "@/types/setting/setting-type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
  ssh?: SshInfo;
}

export default function InstanceModal({
  isOpen,
  onClose,
  option,
  ssh = { id: 0, remoteName: "", remoteHost: "", remoteKeyPath: "" },
}: ModalProps) {
  console.log("ssh: ", ssh);
  const {
    remoteName,
    remoteHost,
    remoteKeyPath,
    remoteNameMsg,
    remoteHostMsg,
    remoteKeyPathMsg,
    isValidRemoteName,
    isValidRemoteHost,
    isValidRemoteKeyPath,
    handleRemoteNameChange,
    handleRemoteHostChange,
    handleRemoteKeyPathChange,
    checkInstanceValidity,
    resetRemoteValues,
  } = useInstanceCheck(ssh.remoteName, ssh.remoteHost, ssh.remoteKeyPath);

  const handleValidButton = () => {
    // addSSHInfo({ remoteName, remoteHost, remoteKeyPath });
  };

  const handeInvalidButton = () => {
    // setIsConfirmModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={() => {
          resetRemoteValues();
          onClose();
        }}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[75%] lg:w-[770px] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[24px] xs:text-[26px] sm:text-[28px] font-bold ml-1">
            {option === "add" ? "인스턴스 추가" : "인스턴스 상세정보"}
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={() => {
              resetRemoteValues();
              onClose();
            }}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-start overflow-y-auto gap-8 xs:gap-9 sm:gap-10 pt-8 xs:pt-9 sm:pt-10 pb-3 xs:pb-4 sm:pb-5 mt-3 xs:mt-4 sm:mt-5 px-0.5">
          <div className="flex flex-col justify-start items-start relative w-full">
            <Input
              type="text"
              label="원격 서버 사용자"
              placeholder="원격 서버의 사용자명을 입력해주세요."
              value={remoteName}
              onChange={handleRemoteNameChange}
            />
            <div
              className={cls(
                "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                isValidRemoteName ? "text-blue-400" : "text-red-400"
              )}
            >
              {remoteNameMsg}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start relative w-full mt-4 xs:mt-5 sm:mt-6">
            <Input
              type="text"
              label="호스트"
              placeholder="원격 서버의 IP 주소를 입력해주세요."
              value={remoteHost}
              onChange={handleRemoteHostChange}
            />
            <div
              className={cls(
                "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                isValidRemoteHost ? "text-blue-400" : "text-red-400"
              )}
            >
              {remoteHostMsg}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start relative w-full mt-4 xs:mt-5 sm:mt-6">
            <Input
              type="text"
              label="프라이빗 키"
              placeholder="SSH pem 키를 업로드해주세요."
              value={remoteKeyPath}
              onChange={handleRemoteKeyPathChange}
              readOnly
            />
            <div
              className={cls(
                "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                isValidRemoteKeyPath ? "text-blue-400" : "text-red-400"
              )}
            >
              {remoteKeyPathMsg}
            </div>
          </div>
        </div>
        {option === "add" ? (
          <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8">
            <ButtonSmall label="완료" onClick={onClose} />
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8 gap-3 xs:gap-4 sm:gap-5">
            <ButtonSmall label="삭제" onClick={onClose} />
            <ButtonSmall label="수정" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}
