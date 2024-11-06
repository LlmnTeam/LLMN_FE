import { useState } from "react";

interface UseInstanceModalReturn {
  isInstanceModalOpen: boolean;
  selectedOption: string;
  openInstanceModal: (option: string) => void;
  closeInstanceModal: () => void;
}

export default function useInstanceModal(): UseInstanceModalReturn {
  const [isInstanceModalOpen, setIsInstanceModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openInstanceModal = (option: string) => {
    setIsInstanceModalOpen(true);
    setSelectedOption(option);
  };

  const closeInstanceModal = () => {
    setIsInstanceModalOpen(false);
    setSelectedOption("");
  };

  return {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  };
}
