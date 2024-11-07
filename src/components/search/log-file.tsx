// 외부 라이브러리
import Image from "next/image";

interface LogFileProps {
  fileName: string;
  redirectURL: string;
}

export default function LogFile({ fileName, redirectURL }: LogFileProps) {
  const handledLogFile = () => {
    if (redirectURL === "") return;
    window.open(redirectURL, "_blank");
  };
  return (
    <>
      <Image
        src="/images/log-file.svg"
        alt="log-file"
        width={60}
        height={60}
        className="w-[44px] h-[44px] xs:w-[52px] xs:h-[52px] sm:w-[60px] sm:h-[60px] cursor-pointer"
        onClick={handledLogFile}
        priority
      />
      <span className="text-[10px] xs:text-[12px] sm:text-[14px] line-clamp-2 text-center px-4">
        {fileName}
      </span>
    </>
  );
}
