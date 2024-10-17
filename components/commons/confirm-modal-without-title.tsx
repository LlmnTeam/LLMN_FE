import React, { useState, useEffect } from "react";
import ButtonSmall from "./button-small";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
  value?: string;
}

export default function ConfirmModalWithoutTitle({
  isOpen,
  onClose,
  option,
  value = "",
}: ModalProps) {
  const modalContents: {
    [key: string]: { message: string; buttonText: string };
  } = {
    validInstance: {
      message: `${value}\n서버는 유효합니다.`,
      buttonText: "확인",
    },
    invalidInstance: {
      message: `${value}\n서버는 유효하지 않습니다.`,
      buttonText: "확인",
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
      <div className="max-w-[90%] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-end items-center">
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] cursor-pointer"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div
          className="text-[14px] xs:text-[16px] sm:text-[18px] mt-2 xs:mt-3 sm:mt-4 font-semibold text-center"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {modalContent.message}
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8">
          <ButtonSmall label={modalContent.buttonText} onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
