import { cls } from "@/libs/utils";
import React from "react";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void; // 토글 이벤트 핸들러를 props로 받음
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isToggled, onToggle }) => {
  return (
    <div
      className={cls(
        "w-[41px] xs:w-[52px] h-[22px] xs:h-[28px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
        isToggled ? "bg-[#0F172A]" : "bg-gray-300"
      )}
      onClick={onToggle}
    >
      <div
        className={cls(
          "bg-white w-4 xs:w-5 h-4 xs:h-5 rounded-full shadow-md transform transition-transform duration-300",
          isToggled ? "translate-x-4 xs:translate-x-6" : "translate-x-0"
        )}
      ></div>
    </div>
  );
};

export default ToggleButton;
