import React, { ReactNode, useState } from "react";
import ButtonSmall from "../commons/button-small";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[85%] sm:w-[75%] h-[500px] xs:h-[600px] sm:h-[720px] bg-white px-6 xs:px-8 sm:px-10 pt-4 xs:pt-5 sm:pt-6 pb-6 xs:pb-7 sm:pb-8 rounded-xl shadow-lg z-10">
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
        <div className="h-[350px] xs:h-[430px] sm:h-[515px] mt-5 py-3 text-[14px] xs:text-[16px] sm:text-[18px] overflow-y-auto overflow-x-hidden bg-red-50 mb-2 xs:mb-3 sm:mb-4"></div>
        <div className="flex flex-row justify-center items-center relative w-full h-auto bg-gray-100 border border-gray-300 rounded-3xl">
          <div className="flex flex-row justify-start items-center w-[5%]">
            <div className="flex flex-row justify-center items-center absolute bottom-4 left-3">
              <Image
                src="/images/arrow-right.svg"
                alt="arrow-right"
                width={19}
                height={13}
                className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[19px] sm:h-[13px]"
              />
            </div>
          </div>
          <div className="w-[85%]">
            <ReactTextareaAutosize
              minRows={1}
              maxRows={3}
              placeholder="여기에 텍스트를 입력하세요..."
              className="block w-full p-2 my-0.5 resize-none border-none bg-gray-100 text-gray-400 placeholder-gray-400 focus:outline-none overflow-y-auto custom-scrollbar"
            />
          </div>
          <div className="flex flex-row justify-end items-center w-[10%]">
            <div className="flex flex-row justify-center items-center w-[35px] h-[35px] bg-black text-[20px] text-white rounded-full absolute bottom-1 right-1">
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
