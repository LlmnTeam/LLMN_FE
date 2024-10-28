import React, { useEffect } from "react";
import useConfirmModal from "@/hooks/commons/use-confirm-modal";
import ConfirmModal from "../commons/confirm-modal";
import Terminal from "react-terminal-ui";
import useToggleButton from "@/hooks/commons/use-toggle-button";
import ToggleButtonSmall from "../commons/toggle-button-small";

const isKorean = (text: string): boolean => {
  const koreanRegex = /[가-힣]/;
  return koreanRegex.test(text);
};

interface TerminalInput {
  type: string;
  value: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: TerminalInput[];
  setInputs: React.Dispatch<React.SetStateAction<TerminalInput[]>>;
  handleCommandSubmit: (command: string) => Promise<void>;
}

export default function ShellModal({
  isOpen,
  onClose,
  inputs,
  setInputs,
  handleCommandSubmit,
}: ModalProps) {
  const { isConfirmModalOpen, openConfirmModal, closeConfirmModal } =
    useConfirmModal();
  const { isToggled, handleToggle } = useToggleButton();

  const handleCloseModal = () => {
    closeConfirmModal();
    onClose();
  };

  const handleInput = async (input: string) => {
    if (isKorean(input)) {
      alert("한글 입력은 지원되지 않습니다.");
      return;
    }

    setInputs((prev) => [
      ...prev,
      { type: "text", value: `user@host:~$ ${input}` },
    ]);

    try {
      await handleCommandSubmit(input);
    } catch (error) {
      setInputs((prev) => [
        ...prev,
        {
          type: "text",
          value: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log("inputs: ", inputs);
  }, [inputs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="flex flex-col relative w-[90%] xs:w-[85%] sm:w-[80%] sm:min-w-[548px] sm:max-w-[1000px] h-[80%] bg-white p-4 xs:p-5 sm:p-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[22px] xs:text-[24px] sm:text-[26px] font-bold ml-1 pr-5 truncate">
            셸 커맨드
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] hover:bg-gray-300 text-[12px] xs:text-[14px] sm:text-[16px] mr-1 cursor-pointer"
            onClick={openConfirmModal}
          >
            ✕
          </div>
        </div>
        <div className="absolute top-[59px] right-[20px] xs:top-[70px] sm:top-[82px] xs:right-[26px] sm:right-[30px] z-50">
          <ToggleButtonSmall isToggled={isToggled} onToggle={handleToggle} />
        </div>
        <div
          className="flex flex-col justify-start items-start relative w-full h-full mt-1 xs:mt-2 sm:mt-3 overflow-hidden"
          // ref={logContainerRef}
        >
          <Terminal
            name="LLMN Terminal"
            prompt="user@host:~$"
            onInput={handleInput}
            colorMode={isToggled === true ? 1 : 0}
          >
            {inputs.map((input, index) => (
              <div
                key={index}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: input.value }}
              />
            ))}
          </Terminal>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        option="closeShellModal"
        overlay={false}
        action={handleCloseModal}
      />
    </div>
  );
}
