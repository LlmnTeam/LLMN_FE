import { useState } from "react";

export default function useInsightRecordModal() {
  const [insightRecordModalOpen, setIsInsightRecordModalOpen] = useState(false);

  const openInsightRecordModal = () => {
    setIsInsightRecordModalOpen(true);
  };

  const closeInsightRecordModal = () => {
    setIsInsightRecordModalOpen(false);
  };

  return {
    insightRecordModalOpen,
    openInsightRecordModal,
    closeInsightRecordModal,
  };
}
