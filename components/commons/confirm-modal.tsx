import React, { useState, useEffect } from "react";
import ButtonSmall from "./button-small";
import { useRouter } from "next/router";
import { cls } from "@/libs/class-utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
  success?: boolean;
  overlay?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  option,
  success = true,
  overlay = true,
}: ModalProps) {
  const router = useRouter();

  const modalContents: {
    [key: string]: {
      title: string;
      message: string;
      buttonText: string;
      action: () => void;
    };
  } = {
    restart: {
      title: "컨테이너를 재시작하시겠습니까?",
      message: "진행 중인 작업이 있다면 종료 후 다시 시작해 주세요.",
      buttonText: "재시작",
      action: onClose,
    },
    stop: {
      title: "컨테이너를 종료하시겠습니까?",
      message: "진행 중인 작업이 있다면 종료 후 다시 시작해 주세요.",
      buttonText: "종료",
      action: onClose,
    },
    delete: {
      title: "정말 프로젝트를 삭제하시겠습니까?",
      message: "관련된 모든 로그 파일과 기록이 삭제되며, 복구가 불가능합니다.",
      buttonText: "삭제",
      action: onClose,
    },
    withdraw: {
      title: "정말 탈퇴하시겠습니까?",
      message: "탈퇴 시 데이터 복구가 불가능합니다.",
      buttonText: "탈퇴",
      action: onClose,
    },
    resetNewPassword: {
      title: "비밀번호 변경",
      message: success
        ? "새 비밀번호로 변경되었습니다."
        : "비밀번호 변경에 실패했습니다.",
      buttonText: "확인",
      action: success
        ? () => {
            router.push("/login");
          }
        : () => {
            window.location.reload();
          },
    },
    changeMonitoringCloud: {
      title: "클라우드 변경",
      message: success
        ? "새 클라우드로 변경되었습니다."
        : "클라우드 변경에 실패했습니다.",
      buttonText: "확인",
      action: onClose,
    },
    createNewProject: {
      title: "프로젝트 생성",
      message: success
        ? "새 프로젝트가 생성되었습니다."
        : "프로젝트 생성에 실패했습니다.",
      buttonText: "확인",
      action: success
        ? () => {
            router.push("/log");
          }
        : () => {
            window.location.reload();
          },
    },
  };

  const modalContent = modalContents[option] || {
    title: "알 수 없는 동작",
    message: "올바른 동작을 선택해주세요.",
    buttonText: "확인",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div
        className={cls(
          "fixed inset-0 bg-black",
          overlay ? "opacity-70" : "opacity-20"
        )}
        // onClick={onClose}
      ></div>
      <div className="max-w-[90%] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px] font-bold">
            {modalContent.title}
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] cursor-pointer"
            onClick={modalContent.action}
          >
            ✕
          </div>
        </div>
        <div className="text-[14px] xs:text-[16px] sm:text-[18px] mt-2 xs:mt-3 sm:mt-4">
          {modalContent.message}
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8">
          <ButtonSmall
            label={modalContent.buttonText}
            onClick={modalContent.action}
          />
        </div>
      </div>
    </div>
  );
}
