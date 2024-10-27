import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useConfirmModal from "@/hooks/commons/use-confirm-modal";
import ConfirmModal from "../commons/confirm-modal";
import { useSSHCommand } from "@/hooks/project/use-ssh-commend";
import Terminal from "react-terminal-ui";

interface TerminalInput {
  type: string;
  value: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShellModal({ isOpen, onClose }: ModalProps) {
  const { inputs, isConnected, setInputs, handleCommandSubmit } =
    useSSHCommand();
  const { isConfirmModalOpen, openConfirmModal, closeConfirmModal } =
    useConfirmModal();

  const handleCloseModal = () => {
    closeConfirmModal();
    onClose();
  };

  // const logContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (logContainerRef.current) {
  //     logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  //   }
  // }, []);

  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleInput = async (input: string) => {
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
      <div className="flex flex-col relative w-[90%] xs:w-[85%] sm:w-[80%] sm:min-w-[548px] sm:max-w-[800px] h-[80%] bg-white px-6 xs:px-8 sm:px-10 pt-4 xs:pt-5 sm:pt-6 pb-6 xs:pb-7 sm:pb-8 rounded-xl shadow-lg z-10">
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
        <div
          className="flex flex-col justify-start items-start w-full h-full mt-5 py-3 mb-4 xs:mb-5 sm:mb-6 text-[14px] xs:text-[16px] sm:text-[18px] bg-gray-100 rounded-3xl overflow-hidden gap-1 xs:gap-2 sm:gap-3"
          // ref={logContainerRef}
        >
          <Terminal
            name="React Terminal UI"
            prompt="user@host:~$"
            onInput={handleInput}
          >
            {inputs.map((input, index) => (
              <div
                key={index}
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                dangerouslySetInnerHTML={{ __html: input.value }}
              />
            ))}
          </Terminal>
          {/* {sshMessageList &&
            sshMessageList.map((msg, index) => (
              <div key={index}>
                {msg.role === "system" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    className="w-full px-5"
                  />
                ) : (
                  <div className="w-full px-5 font-bold">{msg.content}</div>
                )}
              </div>
            ))} */}
          {/* <div dangerouslySetInnerHTML={{ __html: commandOutput }} /> */}
          <div className="flex flex-row justify-start items-center w-full px-5">
            <span className="font-bold">user@host:~$</span>
            {/* <input
              type="text"
              value={command}
              onChange={handleCommandChange}
              onKeyDown={() => {if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault();}}
              className="w-full bg-transparent border-none outline-none text-sm font-mono text-gray-800"
              placeholder=""
              autoFocus
            /> */}
          </div>
        </div>
        {/* <div className="flex flex-row justify-center items-center relative w-full bg-gray-100 border border-gray-300 rounded-3xl">
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
            <input
              type="text"
              placeholder="실행할 셸 명령어를 입력하세요..."
              className="block w-full text-[12px] xs:text-[14px] sm:text-[16px] p-2 my-0 xs:my-[1px] sm:my-0.5 resize-none border-none bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none overflow-y-auto custom-scrollbar"
              value={command}
              onChange={handleCommandChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
          </div>
          <div className="flex flex-row justify-end items-center w-[50px]">
            <div
              className="flex flex-row justify-center items-center w-[27px] h-[27px] xs:w-[31px] xs:h-[31px] sm:w-[35px] sm:h-[35px] bg-gray-800 hover:bg-black text-[18px] xs:text-[19px] sm:text-[20px] text-white rounded-full absolute bottom-1 right-1 sm:right-1.5 cursor-pointer"
              onClick={handleCommandSubmit}
            >
              →
            </div>
          </div>
        </div> */}
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        option="closeShellModal"
        overlay={false}
        action={() => {
          handleCloseModal();
        }}
      />
    </div>
  );
}
