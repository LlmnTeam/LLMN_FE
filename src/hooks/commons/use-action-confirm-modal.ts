import { useState } from "react";

interface UseActionConfirmModalReturn {
  isActionConfirmModalOpen: boolean;
  openActionConfirmModal: () => void;
  closeActionConfirmModal: () => void;
}

export default function useActionConfirmModal(): UseActionConfirmModalReturn {
  const [isActionConfirmModalOpen, setIsActionConfirmModalOpen] =
    useState(false);

  const openActionConfirmModal = () => {
    setIsActionConfirmModalOpen(true);
  };

  const closeActionConfirmModal = () => {
    setIsActionConfirmModalOpen(false);
  };

  return {
    isActionConfirmModalOpen,
    openActionConfirmModal,
    closeActionConfirmModal,
  };
}
