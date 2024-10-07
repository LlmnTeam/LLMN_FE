import Image from "next/image";

interface EmptyBoxProps {
  title: string;
  content: string;
}

export default function EmptyBox({ title, content }: EmptyBoxProps) {
  return (
    <div className="flex flex-col justify-start items-start w-full min-h-[210px] xs:min-h-[260px] sm:min-h-[310px] rounded-lg border border-[#E5E7EB] shadow-md gap-2 px-6 xs:px-8 sm:px-10 pt-3 xs:pt-4 sm:pt-5 pb-6 xs:pb-7 sm:pb-8 mt-6 xs:mt-7 sm:mt-8">
      <div className="flex flex-row justify-between items-center relative w-full mb-1 xs:mb-2">
        <span className="text-[21px] xs:text-[24px] sm:text-[27px] font-bold">
          {title}
        </span>
        <Image
          src="/images/chevron-right.svg"
          alt="chevron-right"
          width={20}
          height={20}
          className="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]"
        />
        <div className="absolute top-0.5 xs:top-0 right-[10%] text-[12px] xs:text-[14px] sm:text-[16px] text-[#979797] font-normal mt-1 xs:mt-2">
          업데이트 되지 않음
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-5 xs:mt-6 sm:mt-8">
        <Image
          src="/images/empty.svg"
          alt="empty"
          width={65}
          height={67}
          className="w-[45px] h-[47px] xs:w-[55px] xs:h-[57px] sm:w-[65px] sm:h-[67px]"
        />
        <span className="w-full text-center text-[13px] xs:text-[15px] sm:text-[17px] font-medium mt-3 xs:mt-4 sm:mt-5">
          {content}
        </span>
      </div>
    </div>
  );
}
