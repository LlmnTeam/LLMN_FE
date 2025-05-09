// 외부 라이브러리
import { useRouter } from "next/router";

// 프로젝트 내부 훅과 유틸리티 함수
import { cls } from "@/src/utils/class-utils";

// 프로젝트 내부 컴포넌트
import ButtonSmall from "./button-small";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
  success?: boolean;
  overlay?: boolean;
  message?: string;
  id?: number;
  action?: () => void;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  option,
  success = true,
  overlay = true,
  message = "",
  id = 0,
  action = () => {},
}: ConfirmModalProps) {
  const router = useRouter();

  const modalContents: {
    [key: string]: {
      title: string;
      message: string;
      buttonText: string[];
      closeAction: () => void;
      confirmAction: () => void;
    };
  } = {
    loginFailure: {
      title: "로그인 실패",
      message: message,
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    resetNewPassword: {
      title: "비밀번호 변경",
      message: success
        ? "새 비밀번호로 변경되었습니다."
        : "비밀번호 변경에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
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
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    createNewProject: {
      title: "프로젝트 생성",
      message: success
        ? "새 프로젝트가 생성되었습니다."
        : "프로젝트 생성에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
        ? () => {
            router.push("/project");
          }
        : () => {
            window.location.reload();
          },
    },
    addNewInstance: {
      title: "인스턴스 추가",
      message: success
        ? "새 인스턴스가 성공적으로 추가되었습니다."
        : "인스턴스 추가에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    editInstance: {
      title: "인스턴스 수정",
      message: success
        ? "인스턴스가 성공적으로 수정되었습니다."
        : "인스턴스 수정에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    deleteInstance: {
      title: "인스턴스 삭제",
      message: success
        ? "인스턴스가 성공적으로 삭제되었습니다."
        : "인스턴스 삭제에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    reconnectInstance: {
      title: "인스턴스 재연결",
      message: success
        ? "인스턴스가 성공적으로 재연결되었습니다."
        : "인스턴스 재연결에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: onClose,
    },
    editProjectInfo: {
      title: "프로젝트 수정",
      message: success
        ? "프로젝트가 성공적으로 수정되었습니다."
        : "프로젝트 수정에 실패했습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
        ? () => {
            router.push(`/project/${id}`);
          }
        : () => {
            window.location.reload();
          },
    },
    closeChatbotModal: {
      title: "질문을 종료하시겠습니까?",
      message: "대화를 종료하면 입력된 내용이 사라집니다.",
      buttonText: ["종료"],
      closeAction: onClose,
      confirmAction: action,
    },
    closeShellModal: {
      title: "셸 커맨드를 종료하시겠습니까?",
      message: "진행 중인 명령어와 입력된 내용이 모두 사라집니다.",
      buttonText: ["종료"],
      closeAction: onClose,
      confirmAction: action,
    },
    signupResult: {
      title: "회원가입",
      message: success
        ? "회원가입이 완료되었습니다."
        : "회원가입에 실패하였습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
        ? () => {
            router.push("/login");
          }
        : onClose,
    },
    editSetting: {
      title: "회원정보 수정",
      message: success
        ? "회원정보 수정이 완료되었습니다."
        : "회원정보 수정에 실패하였습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
        ? () => {
            window.location.reload();
          }
        : onClose,
    },
    logout: {
      title: "정말 로그아웃하시겠습니까?",
      message: "진행 중인 작업이 저장되지 않을 수 있습니다. 계속하시겠습니까?",
      buttonText: ["취소", "로그아웃"],
      closeAction: onClose,
      confirmAction: action,
    },
    editOpenAIKey: {
      title: "API 키 수정",
      message: success
        ? "API 키 수정이 완료되었습니다."
        : "API 키 수정에 실패하였습니다.",
      buttonText: ["확인"],
      closeAction: onClose,
      confirmAction: success
        ? () => {
            window.location.reload();
          }
        : onClose,
    },
  };

  const modalContent = modalContents[option] || {
    title: "알 수 없는 동작",
    message: "올바른 동작을 선택해주세요.",
    buttonText: "확인",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen full-height flex items-center justify-center z-40">
      <div
        className={cls(
          "fixed inset-0 w-full h-full bg-black",
          overlay ? "opacity-70" : "opacity-20"
        )}
        onClick={modalContent.closeAction}
      ></div>
      <div className="max-w-[90%] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px] font-bold">
            {modalContent.title}
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] hover:bg-gray-300 text-[12px] xs:text-[14px] sm:text-[16px] cursor-pointer"
            onClick={modalContent.closeAction}
          >
            ✕
          </div>
        </div>
        <div
          className="text-[14px] xs:text-[16px] sm:text-[18px] mt-2 xs:mt-3 sm:mt-4 text-center"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {modalContent.message}
        </div>
        {modalContent.buttonText.length > 1 ? (
          <div className="flex flex-row justify-center items-center w-full mt-3 xs:mt-4 sm:mt-5 gap-3 xs:gap-4 sm:gap-5">
            <ButtonSmall
              label={modalContent.buttonText[0]}
              onClick={modalContent.closeAction}
              type="modal"
            />
            <ButtonSmall
              label={modalContent.buttonText[1]}
              onClick={modalContent.confirmAction}
              type="modal"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center w-full mt-3 xs:mt-4 sm:mt-5">
            <ButtonSmall
              label={modalContent.buttonText[0]}
              onClick={modalContent.confirmAction}
              type="modal"
            />
          </div>
        )}
      </div>
    </div>
  );
}
