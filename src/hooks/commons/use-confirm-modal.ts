import { useState } from "react";

interface UseConfirmModalReturn {
  isConfirmModalOpen: boolean;
  success: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useConfirmModal(): UseConfirmModalReturn {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return {
    isConfirmModalOpen,
    success,
    openConfirmModal,
    closeConfirmModal,
    setSuccess,
  };
}
