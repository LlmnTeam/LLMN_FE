import ButtonSmall from "@/components/commons/button-small";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import usePasswordCheck from "@/hooks/login/use-password-check";
import { cls } from "@/libs/class-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FindAccountStep2() {
  const router = useRouter();

  const {
    password,
    passwordConfirm,
    isValidPassword,
    isPasswordMatching,
    validationMessage,
    confirmMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = usePasswordCheck();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(isValidPassword && isPasswordMatching ? false : true);
  }, [isValidPassword, isPasswordMatching]);

  const handleNextButton = (): void => {
    if (disabled) return;
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[498px] xs:h-[550px] sm:h-[610px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-col justify-start items-center relative w-full mt-8 xs:mt-9 sm:mt-10">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={handlePasswordChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
              isValidPassword ? "text-blue-400" : "text-red-400"
            )}
          >
            {validationMessage}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-5 xs:mt-6 sm:mt-7">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            readOnly={isValidPassword ? false : true}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
              isPasswordMatching ? "text-blue-400" : "text-red-400"
            )}
          >
            {confirmMessage}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6 pb-[15vh]">
        <button
          className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]"
          onClick={() => router.push("/login/signup-step1")}
        >
          취소
        </button>
        <ButtonSmall
          label="다음"
          disabled={disabled}
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
}
