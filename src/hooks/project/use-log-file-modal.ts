import { useState } from "react";

interface UseLogFileModalReturn {
  isLogFileModalOpen: boolean;
  openLogFileModal: () => void;
  closeLogFileModal: () => void;
}

export default function useLogFileModal(): UseLogFileModalReturn {
  const [isLogFileModalOpen, setIsLogFileModalOpen] = useState(false);

  const openLogFileModal = () => setIsLogFileModalOpen(true);
  const closeLogFileModal = () => setIsLogFileModalOpen(false);

  return {
    isLogFileModalOpen,
    openLogFileModal,
    closeLogFileModal,
  };
}
