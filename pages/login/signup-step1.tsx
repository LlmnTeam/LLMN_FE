import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

export default function SignupStep1() {
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen gap-3 px-6 pt-[15vh] overflow-hidden">
      <div className="flex flex-row justify-center items-center gap-3 mb-4">
        <Image src="/images/logo.svg" alt="logo" width={46} height={54} />
        <span className="text-3xl font-semibold">LLMN</span>
      </div>
      <Input type="email" label="이메일" placeholder="이메일을 입력해주세요." />
      <div className="w-full max-w-[605px] px-1 -mt-2 text-[13px] xs:text-[15px] font-semibold text-red-500">
        이미 존재하는 이메일입니다.
      </div>
      <Button label="중복확인" kind="check" />
      {/* <div className="flex flex-row justify-end items-center w-full max-w-[605px] -mt-2 text-[14px] xs:text-[16px] font-semibold text-[#717478] cursor-pointer">
        재전송하기
      </div>
      <div className="flex flex-row justify-center items-center w-full max-w-[605px] h-[75px] xs:h-[96px] text-[14px] xs:text-[16px] text-center -mb-5 xs:-mb-6 bg-[#F8F9FA] rounded-lg">
        해당 이메일로 인증코드를 전송하였습니다.
        <br />
        아래에 인증코드를 입력해주세요.
      </div>
      <Input type="code" label="" placeholder="인증 코드를 입력해주세요." />
      <Button label="인증하기" kind="check" /> */}
    </div>
  );
}
