import ButtonSmall from "@/components/button-small";
import Input from "@/components/input";
import Logo from "@/components/logo";

export default function SignupStep2() {
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] pb-[15vh] overflow-y-auto overflow-x-hidden">
      <Logo />
      <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
        <Input
          type="text"
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
        />
        <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
          닉네임을 2자에서 8자 사이로 입력해주세요.
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
        />
        <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
          비밀번호가 유효하지 않습니다.
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-screen px-6 mt-2.5 xs:mt-3 sm:mt-3.5">
        <Input
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
        />
        <div className="w-full max-w-[605px] text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px]">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />{" "}
      </div>
    </div>
  );
}
