interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
}

export default function ButtonSmall({
  label,
  onClick,
  color = "#0F172A",
}: ButtonProps) {
  return (
    <div className="flex flex-row justify-center items-center relative flex-shrink-0">
      <button
        className={`h-[40px] xs:h-[45px] sm:h-[50px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md font-semibold px-[20px] xs:px-[22px] sm:px-[24px] text-white`}
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
