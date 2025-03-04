// 외부 라이브러리
import { useState } from "react";

// 서버 사이드 데이터, 타입 및 API
import type { TerminalInput } from "@/src/types/project/project-type";

// 프로젝트 내부 훅과 유틸리티 함수
import useSSHCommand from "./use-ssh-command";

interface UseShellModalReturn {
  isShellModalOpen: boolean;
  openShellModal: () => Promise<void>;
  closeShellModal: () => void;
  inputs: TerminalInput[];
  setInputs: React.Dispatch<React.SetStateAction<TerminalInput[]>>;
  handleCommandSubmit: (command: string) => Promise<void>;
}

export default function useShellModal(): UseShellModalReturn {
  const {
    inputs,
    setInputs,
    handleCommandSubmit,
    connectSocket,
    disconnectSocket,
  } = useSSHCommand();
  const [isShellModalOpen, setIsShellModalOpen] = useState(false);

  const openShellModal = async () => {
    try {
      await connectSocket();
      setIsShellModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeShellModal = () => {
    setIsShellModalOpen(false);
    disconnectSocket();
  };

  return {
    isShellModalOpen,
    openShellModal,
    closeShellModal,
    inputs,
    setInputs,
    handleCommandSubmit,
  };
}
