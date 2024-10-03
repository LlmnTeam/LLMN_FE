import React, { ReactNode, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogFileModal({ isOpen, onClose }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[548px] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[20px] xs:text-[22px] sm:text-[24px] font-bold ml-1">
            질문할 로그
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-start h-[337px] xs:h-[350px] sm:h-[363px] rounded-lg border border-[#E5E7EB] overflow-y-auto px-2 py-2 mt-3 xs:mt-4 sm:mt-5">
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
          <div className="w-full hover:bg-gray-100 rounded-xl text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-3 py-2 truncate flex-shrink-0">
            mongo-log-2024-09-10_12.txt
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-3 xs:mt-4 sm:mt-5">
          <button
            onClick={onClose}
            className="w-[84px] xs:w-[90px] sm:w-[96px] h-[34px] xs:h-[36px] sm:h-[39px] text-[14px] xs:text-[15px] sm:text-[16px] text-white font-semibold bg-[#0F172A] rounded-md"
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
}
