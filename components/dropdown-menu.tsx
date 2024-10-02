import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DropdownMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

// 영어 옵션과 한글 텍스트를 매핑하는 객체
const optionLabelMap: { [key: string]: string } = {
  edit: "수정하기",
  restart: "컨테이너 재시작",
  stop: "컨테이너 종료",
  delete: "삭제하기",
};

export default function DropdownMenu({ options, onSelect }: DropdownMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    console.log("menu is open: ", isMenuOpen);
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={toggleMenu}>
        <Image
          src="/images/ellipsis-vertical.svg"
          alt="ellipsis-vertical"
          width={44}
          height={44}
          className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] mt-1.5"
        />
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-28 xs:w-32 sm:w-36 bg-white border border-gray-300 rounded-xl shadow-lg z-10"
        >
          {options.map((option) => (
            <div
              key={option}
              className="text-[12px] xs:text-[14px] sm:text-[16px] font-medium last:text-[#FD5252] border-b-[1px] last:border-b-0 border-[#DBDBDB] first:rounded-tl-xl first:rounded-tr-xl last:rounded-bl-xl last:rounded-br-xl px-1 xs:px-2 sm:px-3 py-1 sm:py-1.5 text-center hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsMenuOpen(false);
              }}
            >
              {optionLabelMap[option] || option}
              {/* optionLabelMap에 없는 값이 들어올 경우 기본 option을 표시 */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
