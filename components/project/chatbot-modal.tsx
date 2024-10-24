import React, { ReactNode, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  logFileList: string[];
}

export default function ChatbotModal({
  isOpen,
  onClose,
  logFileList,
}: ModalProps) {
  const [logFiles, setLogFiles] = useState<string[]>(logFileList);
  console.log("logFiles: ", logFiles);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-0"></div>
      <div className="flex flex-col relative w-[90%] xs:w-[85%] sm:w-[80%] sm:min-w-[548px] h-[80%] bg-white px-6 xs:px-8 sm:px-10 pt-4 xs:pt-5 sm:pt-6 pb-6 xs:pb-7 sm:pb-8 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[22px] xs:text-[24px] sm:text-[26px] font-bold ml-1 pr-5 truncate">
            질문하기
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full h-full mt-5 py-3 pb-5 text-[14px] xs:text-[16px] sm:text-[18px] overflow-y-scroll overflow-x-hidden gap-6 xs:gap-7 sm:gap-8 custom-scrollbar">
          {/* <div className="flex flex-row justify-end items-start w-full px-3 xs:px-5 sm:px-7 gap-2">
            <div className="flex flex-col justify-start items-end gap-0 xs:gap-0.5 sm:gap-1">
              <div className="text-[13px] xs:text-[15px] sm:text-[17px] font-bold mr-2">
                호얘이
              </div>
              <div className="max-w-[85%] lg:max-w-[510px] bg-[#F6F6F6] p-5 rounded-3xl rounded-tr-none text-[12px] xs:text-[14px] sm:text-[16px]">
                2024-10-04 15:45에 Spring 애플리케이션에서 발생한 성능 저하 및
                간헐적인 HTTP 503 오류의 원인이 무엇인지 자세히 설명해줘
              </div>
            </div>
            <div className="mt-3 w-[30px] h-[30px] flex-shrink-0">
              <Image
                src="/images/profile.svg"
                alt="profile"
                width={30}
                height={30}
                className=""
              />
            </div>
          </div> */}
          <div className="flex flex-row justify-end items-start w-full px-2 xs:px-3 sm:px-4 gap-2">
            <div className="max-w-[75%] lg:max-w-[510px] bg-[#F6F6F6] px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 rounded-3xl text-[12px] xs:text-[14px] sm:text-[16px]">
              2024-10-04 15:45에 Spring 애플리케이션에서 발생한 성능 저하 및
              간헐적인 HTTP 503 오류의 원인이 무엇인지 자세히 설명해줘
            </div>
          </div>
          <div className="flex flex-row justify-start items-start w-full gap-1 xs:gap-2 sm:gap-3 pr-2 xs:pr-3 sm:pr-4">
            <div className="-mt-3 w-[30px] h-[30px] flex-shrink-0">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="w-[20px] h-[20px] xs:w-[25px] xs:h-[25px] sm:w-[30px] sm:h-[30px]"
              />
            </div>
            <div className="w-full text-[12px] xs:text-[14px] sm:text-[16px]">
              2024-10-04 15:45에 Spring 애플리케이션에서 발생한 성능 저하 및
              간헐적인 HTTP 503 오류의 원인이 무엇인지 자세히 설명해줘
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center relative w-full bg-gray-100 border border-gray-300 rounded-3xl">
          <div className="flex flex-row justify-start items-center w-[50px]">
            <div className="flex flex-row justify-center items-center absolute sm:bottom-4 left-3">
              <Image
                src="/images/arrow-right.svg"
                alt="arrow-right"
                width={19}
                height={13}
                className="w-[15px] h-[9px] xs:w-[17px] xs:h-[11px] sm:w-[19px] sm:h-[13px]"
              />
            </div>
          </div>
          <div className="w-full">
            <ReactTextareaAutosize
              minRows={1}
              maxRows={3}
              placeholder="여기에 텍스트를 입력하세요..."
              className="block w-full text-[12px] xs:text-[14px] sm:text-[16px] p-2 my-0 xs:my-[1px] sm:my-0.5 resize-none border-none bg-gray-100 text-gray-400 placeholder-gray-400 focus:outline-none overflow-y-auto custom-scrollbar"
            />
          </div>
          <div className="flex flex-row justify-end items-center w-[50px]">
            <div className="flex flex-row justify-center items-center w-[27px] h-[27px] xs:w-[31px] xs:h-[31px] sm:w-[35px] sm:h-[35px] bg-black text-[18px] xs:text-[19px] sm:text-[20px] text-white rounded-full absolute bottom-1 right-1 sm:right-1.5">
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
