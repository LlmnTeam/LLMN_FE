import Image from "next/image";

interface LogFileProps {
  filename: string;
}

export default function LogFile({ filename }: LogFileProps) {
  return (
    <>
      <Image
        src="/images/log-file.svg"
        alt="log-file"
        width={65}
        height={64}
        className="w-[40px] h-[39px] xs:w-[52px] xs:h-[51px] sm:w-[65px] sm:h-[64px] cursor-pointer"
      />
      <span className="text-[10px] xs:text-[12px] sm:text-[14px] line-clamp-2 text-center px-4">
        mongo-log-2024-09-10_12.txt
      </span>
    </>
  );
}
