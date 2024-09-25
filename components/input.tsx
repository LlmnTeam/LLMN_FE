interface InputProps {
  label: string;
  name: string;
  kind?: "email" | "password";
  [key: string]: any;
}

export default function Input({
  label,
  name,
  kind = "email",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col justify-center items-center relative w-full max-w-[605px] mt-5 xs:mt-8">
      <label
        htmlFor={name}
        className="absolute -top-6 xs:-top-7 left-1 text-[15px] xs:text-[18px]"
      >
        {label}
      </label>
      <input
        id={name}
        type={name}
        placeholder={
          name === "email"
            ? "이메일을 입력해주세요."
            : "비밀번호를 입력해주세요"
        }
        className="appearance-none w-full h-[50px] xs:h-[60px] text-[14px] xs:text-[16px] text-gray-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:ring-offset-0 focus:ring-1"
      />
    </div>
  );
}
