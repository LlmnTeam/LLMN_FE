// 프로젝트 내부 훅과 유틸리티 함수
import { cls } from "@/src/utils/class-utils";

interface ToggleButtonSmallProps {
  isToggled: boolean;
  onToggle: () => void;
}

export default function ToggleButtonSmall({
  isToggled,
  onToggle,
}: ToggleButtonSmallProps) {
  return (
    <div
      className={cls(
        "w-[34px] h-[18px] xs:w-[38px] xs:h-[20px] sm:w-[42px] sm:h-[22px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
        isToggled ? "bg-black" : "bg-gray-300"
      )}
      onClick={onToggle}
    >
      <div
        className={cls(
          "bg-white w-[14px] h-[14px] xs:w-[15px] xs:h-[15px] sm:w-[16px] sm:h-[16px] rounded-full shadow-md transform transition-transform duration-300",
          isToggled
            ? "translate-x-[12px] xs:translate-x-[15px] sm:translate-x-[18px]"
            : "translate-x-0"
        )}
      ></div>
    </div>
  );
}
