import React, { ReactNode, useEffect, useState } from "react";
import ButtonSmall from "../commons/button-small";
import { LogFileList } from "@/types/project/project-type";
import { cls } from "@/libs/class-utils";
import Image from "next/image";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  LogFileList: LogFileList | null;
}

export default function LogFileModal({
  isOpen,
  onClose,
  LogFileList,
}: ModalProps) {
  const router = useRouter();
  const { id } = router.query;
  console.log("id: ", id);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleChoiceButton = () => {
    if (!selectedFile) return;
    router.push(`/project/${id}/log/${selectedFile}`);
  };

  console.log("LogFileList: ", LogFileList);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[548px] bg-white px-6 xs:px-8 sm:px-10 pt-4 xs:pt-5 sm:pt-6 pb-6 xs:pb-7 sm:pb-8 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[22px] xs:text-[24px] sm:text-[26px] font-bold ml-1">
            질문할 로그
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-start relative h-[337px] xs:h-[350px] sm:h-[363px] rounded-lg border border-[#E5E7EB] overflow-y-auto px-2 py-2 mt-3 xs:mt-4 sm:mt-5 custom-scrollbar">
          {LogFileList && LogFileList.files.length > 0 ? (
            LogFileList.files.map((logFile, index) => (
              <div
                key={index}
                className={cls(
                  "w-full hover:bg-gray-200 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0 cursor-pointer transition-colors",
                  logFile === selectedFile ? "bg-gray-100" : ""
                )}
                onClick={() => handleFileSelect(logFile)}
              >
                {logFile}
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-row justify-center items-center w-full mt-24 xs:mt-24 sm:mt-24">
                <Image
                  src="/images/empty.svg"
                  alt="empty"
                  width={65}
                  height={67}
                  className="w-[52px] h-[54px] xs:w-[59px] xs:h-[60px] sm:w-[65px] sm:h-[67px]"
                />
              </div>
              <div className="w-full text-center text-[13px] xs:text-[14px] sm:text-[15px] mt-10">
                로그 파일이 없습니다.
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-5 xs:mt-6 sm:mt-7">
          <ButtonSmall label="선택" onClick={handleChoiceButton} />
        </div>
      </div>
    </div>
  );
}
