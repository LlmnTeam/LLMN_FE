import Image from "next/image";
import { useRef } from "react";

interface InputInModalProps {
  type: string;
  label: string;
  placeholder: string;
  maxWidth?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  [key: string]: any;
}

export default function InputInModal({
  type,
  label,
  placeholder,
  maxWidth = "605px",
  value = "",
  onChange,
  readOnly = false,
  ...rest
}: InputInModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // 추가로 파일을 처리하는 로직 작성
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center relative w-full mt-5 xs:mt-8"
      style={{ maxWidth: maxWidth }}
    >
      {label?.trim() ? (
        <label
          htmlFor={label}
          className="absolute -top-5 xs:-top-6 sm:-top-7 left-1 text-[14px] xs:text-[16px] sm:text-[18px]"
        >
          {label}
        </label>
      ) : null}
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={value === "" ? placeholder : ""}
        readOnly={readOnly}
        className="appearance-none w-full h-[40px] xs:h-[45px] sm:h-[50px] text-[13px] xs:text-[14px] sm:text-[15px] text-gray-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:ring-offset-0 focus:ring-1"
        {...rest}
      />
      {label === "프라이빗 키" ? (
        <div className="flex flex-row justify-center items-center absolute top-2 sm:top-2.5 right-3 xs:right-4 sm:right-5 cursor-pointer">
          <Image
            src="/images/upload.svg"
            alt="upload"
            width={33}
            height={30}
            className="w-[23px] h-[20px] xs:w-[28px] xs:h-[25px] sm:w-[33px] sm:h-[30px]"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : null}
    </div>
  );
}
