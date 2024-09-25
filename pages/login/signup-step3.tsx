import Input from "@/components/input";
import { cls } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

export default function SignupStep3() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen gap-7 px-6 pt-[15vh] overflow-hidden">
      <div className="flex flex-row justify-center items-center gap-3">
        <Image src="/images/logo.svg" alt="logo" width={46} height={54} />
        <span className="text-3xl font-semibold">LLMN</span>
      </div>
      <div className="flex flex-row justify-between items-center w-full max-w-[605px] px-1">
        <div className="text-[16px] xs:text-[20px]">알람 설정</div>
        <div
          className={cls(
            "w-[41px] xs:w-[52px] h-[22px] xs:h-[28px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
            isToggled ? "bg-[#0F172A]" : "bg-gray-300"
          )}
          onClick={handleToggle}
        >
          <div
            className={cls(
              "bg-white w-4 xs:w-5 h-4 xs:h-5 rounded-full shadow-md transform transition-transform duration-300",
              isToggled ? "translate-x-4 xs:translate-x-6" : "translate-x-0"
            )}
          ></div>
        </div>
      </div>
      <Input
        type="text"
        label="원격 서버 사용자"
        placeholder="원격 서버의 사용자명을 입력해주세요."
      />
      <div className="w-full max-w-[605px] px-1 -mt-6 text-[13px] xs:text-[15px] font-semibold text-gray-400">
        닉네임을 2자에서 8자 사이로 입력해주세요.
      </div>
      <Input
        type="text"
        label="호스트"
        placeholder="원격 서버의 IP 주소를 입력해주세요."
      />
      <div className="w-full max-w-[605px] px-1 -mt-6 text-[13px] xs:text-[15px] font-semibold text-red-500">
        비밀번호가 유효하지 않습니다.
      </div>
      <Input
        type="text"
        label="프라이빗 키"
        placeholder="SSH perm 키를 업로드해주세요."
      />
      <div className="w-full max-w-[605px] px-1 -mt-6 text-[13px] xs:text-[15px] font-semibold text-red-500">
        비밀번호가 일치하지 않습니다.
      </div>
      <div className="flex flex-row justify-end items-center gap-3 w-full max-w-[605px] text-[20px] font-semibold">
        <button className="w-[64px] xs:w-[80px] h-[40px] xs:h-[50px] text-[16px] xs:text-[20px] text-black bg-white rounded-md">
          취소
        </button>
        <button className="w-[64px] xs:w-[80px] h-[40px] xs:h-[50px] text-[16px] xs:text-[20px] text-white bg-[#0F172A] rounded-md">
          다음
        </button>
      </div>
    </div>
  );
}
