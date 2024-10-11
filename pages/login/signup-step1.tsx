import ButtonLarge from "@/components/commons/button-large";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";

export default function SignupStep1() {
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] pb-[15vh] overflow-y-auto overflow-x-hidden">
      <Logo />
      <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
        <Input
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
        />
        <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-red-500">
          이미 존재하는 이메일입니다.
        </div>
      </div>
      <ButtonLarge label="중복확인" kind="check" />
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
