import React, { useState, useEffect } from "react";
import ButtonSmall from "./button-small";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
}

export default function ConfirmModal({ isOpen, onClose, option }: ModalProps) {
  const modalContents: {
    [key: string]: { title: string; message: string; buttonText: string };
  } = {
    restart: {
      title: "컨테이너를 재시작하시겠습니까?",
      message: "진행 중인 작업이 있다면 종료 후 다시 시작해 주세요.",
      buttonText: "재시작",
    },
    stop: {
      title: "컨테이너를 종료하시겠습니까?",
      message: "진행 중인 작업이 있다면 종료 후 다시 시작해 주세요.",
      buttonText: "종료",
    },
    delete: {
      title: "정말 프로젝트를 삭제하시겠습니까?",
      message: "관련된 모든 로그 파일과 기록이 삭제되며, 복구가 불가능합니다.",
      buttonText: "삭제",
    },
    withdraw: {
      title: "정말 탈퇴하시겠습니까?",
      message: "탈퇴 시 데이터 복구가 불가능합니다.",
      buttonText: "탈퇴",
    },
  };

  const modalContent = modalContents[option] || {
    title: "알 수 없는 동작",
    message: "올바른 동작을 선택해주세요.",
    buttonText: "확인",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[548px] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px] font-bold">
            {modalContent.title}
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] cursor-pointer"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="text-[14px] xs:text-[16px] sm:text-[18px] mt-2 xs:mt-3 sm:mt-4">
          {modalContent.message}
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8">
          <ButtonSmall label={modalContent.buttonText} />
          {/* <button
            onClick={onClose}
            className="w-[84px] xs:w-[90px] sm:w-[96px] h-[34px] xs:h-[36px] sm:h-[39px] text-[14px] xs:text-[15px] sm:text-[16px] text-white font-semibold bg-[#0F172A] rounded-md"
          >
            {modalContent.buttonText}
          </button> */}
        </div>
      </div>
    </div>
  );
}
