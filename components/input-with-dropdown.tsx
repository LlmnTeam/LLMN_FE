import { useState } from "react";
import Input from "@/components/input"; // Input 컴포넌트 임포트

interface InputWithDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (selected: string) => void;
  maxWidth?: string;
}

export default function InputWithDropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  maxWidth = "1000px",
}: InputWithDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full" style={{ maxWidth }}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        <Input
          type="text"
          label={label}
          value={value}
          placeholder={placeholder}
          readOnly={true}
          maxWidth={maxWidth}
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full max-w-[1000px] max-h-[140px] text-[14px] xs:text-[15px] sm:text-[16px] text-gray-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white z-10 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
