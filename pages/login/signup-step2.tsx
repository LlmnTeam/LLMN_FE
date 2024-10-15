import ButtonSmall from "@/components/commons/button-small";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import ToggleButton from "@/components/commons/toggle-button";
import useToggleButton from "@/hooks/commons/use-toggle-button";
import { useNicknameCheck } from "@/hooks/login/use-nickname-check";
import { usePasswordCheck } from "@/hooks/login/use-password-check";
import { cls } from "@/libs/class-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignupStep2() {
  const router = useRouter();

  const { isToggled, handleToggle } = useToggleButton();

  const {
    nickname,
    isPossibleNickname,
    nicknameMsg,
    handleNicknameChange,
    verifyNickname,
  } = useNicknameCheck();

  const {
    password,
    passwordConfirm,
    isPasswordValid,
    isPasswordMatching,
    validationMessage,
    confirmMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = usePasswordCheck();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      isPossibleNickname && isPasswordValid && isPasswordMatching ? false : true
    );
  }, [isPossibleNickname, isPasswordValid, isPasswordMatching]);

  const handleNextButton = (): void => {
    if (!isPossibleNickname || !isPasswordValid || !isPasswordMatching) return;
    sessionStorage.setItem("receivingAlarm", isToggled ? "true" : "false");
    sessionStorage.setItem("nickName", nickname);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("passwordConfirm", passwordConfirm);
    router.push("/login/signup-step3");
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[690px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-row justify-between items-center w-full px-1 -mt-4 xs:-mt-5 sm:-mt-6">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px]">
            알람 설정
          </div>
          <ToggleButton isToggled={isToggled} onToggle={handleToggle} />
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-2.5 xs:mt-3 sm:mt-3.5">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
              isPossibleNickname === null
                ? "text-gray-400"
                : isPossibleNickname
                ? "text-blue-400"
                : "text-red-400"
            )}
          >
            {nicknameMsg}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-7 xs:mt-8 sm:mt-9">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={handlePasswordChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
              isPasswordValid === null
                ? "text-gray-400"
                : isPasswordValid
                ? "text-blue-400"
                : "text-red-400"
            )}
          >
            {validationMessage}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-7 xs:mt-8 sm:mt-9">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <div
            className={cls(
              "w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
              isPasswordMatching === null
                ? "text-gray-400"
                : isPasswordMatching
                ? "text-blue-400"
                : "text-red-400"
            )}
          >
            {confirmMessage}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6">
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
