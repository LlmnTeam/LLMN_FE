import { useState } from "react";

export default function useShellModal() {
  const [isShellModalOpen, setIsShellModalOpen] = useState(false);

  const openShellModal = () => {
    setIsShellModalOpen(true);
  };

  const closeShellModal = () => {
    setIsShellModalOpen(false);
  };

  return {
    isShellModalOpen,
    openShellModal,
    closeShellModal,
  };
}
