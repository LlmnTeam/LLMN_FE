import { useState } from "react";

interface UseInstanceValidationModalReturn {
  isInstanceValidationModalOpen: boolean;
  openInstanceValidationModal: () => void;
  closeInstanceValidationModal: () => void;
}

export default function useInstanceValidationModal(): UseInstanceValidationModalReturn {
  const [isInstanceValidationModalOpen, setIsInstanceValidationModalOpen] =
    useState(false);

  const openInstanceValidationModal = () => {
    setIsInstanceValidationModalOpen(true);
  };

  const closeInstanceValidationModal = () => {
    setIsInstanceValidationModalOpen(false);
  };

  return {
    isInstanceValidationModalOpen,
    openInstanceValidationModal,
    closeInstanceValidationModal,
  };
}
