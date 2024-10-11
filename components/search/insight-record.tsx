import Image from "next/image";

interface InsightRecordProps {
  name: string;
  type: string;
  date: string;
  onClick: () => void;
}

export default function InsightRecord({
  name,
  type,
  date,
  onClick,
}: InsightRecordProps) {
  return (
    <>
      <div
        className="flex flex-row justify-evenly items-center w-full rounded-xl bg-[#F4F4F5] px-2 xs:px-6 sm:px-10 py-1.5 font-medium border border-transparent hover:border-gray-400 cursor-pointer"
        onClick={onClick}
      >
        <div className="w-[25%] text-left text-[12px] xs:text-[15px] sm:text-[18px] font-medium">
          {name}
        </div>
        <div className="w-[20%] text-center text-[9px] xs:text-[12px] sm:text-[15px] font-normal">
          {type}
        </div>
        <div className="w-[55%] text-right text-[9px] xs:text-[12px] sm:text-[15px] font-extralight">
          {date}
        </div>
      </div>
    </>
  );
}
