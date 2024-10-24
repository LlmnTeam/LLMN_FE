import React, { ReactNode, useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { LogFile, LogFiles } from "@/types/project/project-type";
import { useChatbotSSE } from "@/hooks/project/use-chatbot-sse";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  logFileList: string[];
}

const convertToLogFiles = (fileNames: string[]): LogFile[] => {
  return fileNames.map((fileName) => ({ name: fileName }));
};

export default function ChatbotModal({
  isOpen,
  onClose,
  logFileList,
}: ModalProps) {
  const {
    question,
    logSummary,
    isConnected,
    handleQuestionChange,
    startSSE,
    stopSSE,
  } = useChatbotSSE({
    logFiles: logFileList.map((name) => ({ name })),
    isFirstQuestion: true,
  });

  // useEffect(() => {
  //   console.log("chatHistory: ", chatHistory);
  // }, [chatHistory]);

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
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] hover:bg-gray-300 text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full h-full mt-5 py-3 pb-5 text-[14px] xs:text-[16px] sm:text-[18px] overflow-y-scroll overflow-x-hidden gap-6 xs:gap-7 sm:gap-8 custom-scrollbar">
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
            <div
              className="w-full text-[12px] xs:text-[14px] sm:text-[16px]"
              style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
            >
              {/* {`HTTP 503 오류와 성능 저하는 Spring 애플리케이션에서 다양한 원인으로 발생할 수 있습니다. \n아래는 두 문제에 대한 구체적인 원인과 해결 방법입니다. \n\n1. 성능 저하의 주요 원인 \n\n  1) 데이터베이스 병목 현상 \n    원인: 쿼리 최적화가 안 되었거나, 동시에 너무 많은 요청이 데이터베이스에 집중될 때. \n    해결: 쿼리 최적화 및 인덱스 적용. 커넥션 풀 크기 조정 및 분산 처리(예: Redis 캐시 사용). \n\n  2) 메모리 누수(OutOfMemoryError) \n    원인: 잘못된 객체 관리로 인해 사용되지 않는 객체가 메모리에서 해제되지 않음. \n    해결: 프로파일링 도구(VisualVM, YourKit)로 메모리 누수 확인. @PreDestroy 등 메모리 해제 로직 추가. \n\n  3) 쓰레드 부족 또는 동시성 문제 \n    원인: 동시 처리 요청이 많아 쓰레드 풀이 부족하거나 동시성 문제가 발생할 때. \n    해결: ExecutorService로 비동기 처리. 쓰레드 풀 크기 조정 및 요청 큐 최적화.`} */}
              {logSummary}
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
              className="block w-full text-[12px] xs:text-[14px] sm:text-[16px] p-2 my-0 xs:my-[1px] sm:my-0.5 resize-none border-none bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none overflow-y-auto custom-scrollbar"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="flex flex-row justify-end items-center w-[50px]">
            <div
              className="flex flex-row justify-center items-center w-[27px] h-[27px] xs:w-[31px] xs:h-[31px] sm:w-[35px] sm:h-[35px] bg-black text-[18px] xs:text-[19px] sm:text-[20px] text-white rounded-full absolute bottom-1 right-1 sm:right-1.5"
              onClick={startSSE}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
