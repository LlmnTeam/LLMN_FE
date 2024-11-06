import { useState } from "react";

interface UserChatbotModalReturn {
  isChatbotModalOpen: boolean;
  openChatbotModal: () => void;
  closeChatbotModal: () => void;
}

export default function useChatbotModal(): UserChatbotModalReturn {
  const [isChatbotModalOpen, setIschatbotModalOpen] = useState(false);

  const openChatbotModal = () => {
    setIschatbotModalOpen(true);
  };

  const closeChatbotModal = () => {
    setIschatbotModalOpen(false);
  };

  return {
    isChatbotModalOpen,
    openChatbotModal,
    closeChatbotModal,
  };
}
