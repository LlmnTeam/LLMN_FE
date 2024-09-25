interface ButtonProps {
  label: string;
  kind: string;
  [key: string]: any;
}

export default function Button({
  label,
  kind = "login",
  ...rest
}: ButtonProps) {
  return (
    <div className="flex flex-row justify-center items-center relative w-full max-w-[605px] mt-4 xs:mt-7">
      <button className="w-full h-[52px] xs:h-[64px] rounded-md bg-[#0F172A] text-white text-[18px] xs:text-[22px] font-semibold">
        {label}
      </button>
      {kind === "login" ? (
        <>
          <span className="absolute left-0.5 top-[55px] xs:top-[70px] text-[14px] xs:text-[16px] font-semibold text-[#717478] cursor-pointer">
            회원가입
          </span>
          <span className="absolute right-0.5 top-[55px] xs:top-[70px] text-[14px] xs:text-[16px] font-semibold text-[#717478] cursor-pointer">
            비밀번호 찾기
          </span>
        </>
      ) : null}
    </div>
  );
}
