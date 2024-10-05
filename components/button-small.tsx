interface ButtonProps {
  label: string;
  [key: string]: any;
}

export default function ButtonSmall({ label, ...rest }: ButtonProps) {
  return (
    <div className="flex flex-row justify-center items-center relative">
      <button className="h-[40px] xs:h-[45px] sm:h-[50px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-[#0F172A] text-white font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
        {label}
      </button>
    </div>
  );
}
