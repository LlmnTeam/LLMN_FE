import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

export default function SignupStep2() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-7 px-6 pb-[15vh] overflow-hidden">
      <div className="flex flex-row justify-center items-center gap-3 mb-4">
        <Image src="/images/logo.svg" alt="logo" width={46} height={54} />
        <span className="text-3xl font-semibold">LLMN</span>
      </div>
      <Input type="text" label="닉네임" placeholder="닉네임을 입력해주세요." />
      <div className="w-full max-w-[605px] px-1 -mt-6 text-[13px] xs:text-[15px] font-semibold text-gray-400">
        닉네임을 2자에서 8자 사이로 입력해주세요.
      </div>
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
      />
      <div className="w-full max-w-[605px] px-1 -mt-6 text-[13px] xs:text-[15px] font-semibold text-red-500">
        이미 존재하는 이메일입니다.
      </div>
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해주세요."
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
