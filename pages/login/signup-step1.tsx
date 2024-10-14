import ButtonLarge from "@/components/commons/button-large";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import { useEmailCheck } from "@/hooks/login/use-email-check";
import { cls } from "@/libs/utils";
import { useEffect } from "react";

export default function SignupStep1() {
  const {
    email,
    code,
    isEmailAvailable,
    isCodeAvailable,
    emailMsg,
    codeMsg,
    timer,
    handleEmailChange,
    handleCodeChange,
    verifyEmail,
    verifyCode,
    resendCode,
    handledNextButton,
  } = useEmailCheck();

  useEffect(() => {
    console.log("timer: ", timer);
  }, [timer]);

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-[605px] mx-auto h-screen gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] pb-[15vh] overflow-y-auto overflow-x-hidden">
      <Logo />
      <div className="flex flex-col justify-start items-center relative w-full mt-2.5 xs:mt-3 sm:mt-3.5">
        <Input
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
          readOnly={isEmailAvailable ? true : false}
        />
        <div className="flex flex-row justify-between items-center absolute top-[45px] xs:top-[50px] sm:top-[55px] w-full max-w-[605px]">
          <div
            className={cls(
              "text-[12px] xs:text-[13px] sm:text-[14px] font-semibold",
              isEmailAvailable
                ? "visible text-blue-400"
                : !isEmailAvailable && email.trim()
                ? "visible text-red-400"
                : "hidden"
            )}
          >
            {emailMsg}
          </div>
          <div
            className={cls(
              "text-[14px] xs:text-[15px] sm:text-[16px] font-semibold text-[#717478] cursor-pointer",
              isEmailAvailable ? "visible" : "hidden"
            )}
          >
            재전송하기
          </div>
        </div>
      </div>
      {!isEmailAvailable ? (
        <ButtonLarge
          label="중복확인"
          kind="check"
          onClick={() => verifyEmail()}
        />
      ) : (
        <>
          <div className="flex flex-row justify-center items-center w-full text-[13px] xs:text-[14px] sm:text-[15px] text-center py-3 xs:py-4 sm:py-5 mt-1 xs:mt-2 sm:mt-3 -mb-3 xs:-mb-4 sm:-mb-5 bg-[#F8F9FA] rounded-lg">
            해당 이메일로 인증코드를 전송하였습니다.
            <br />
            아래에 인증코드를 입력해주세요.
          </div>
          <div className="flex flex-col justify-start items-center relative w-full mt-2.5 xs:mt-3 sm:mt-3.5 mb-3 xs:mb-4 sm:mb-5">
            <Input
              type="code"
              label=""
              placeholder="인증 코드를 입력해주세요."
            />
            <div
              className={cls(
                "flex flex-row justify-center items-center h-full absolute right-4 text-[14px] xs:text-[15px] sm:text-[16px]",
                isEmailAvailable ? "visible" : "hidden"
              )}
            >
              <div className="w-[40px]">
                {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <div
              className={cls(
                "absolute top-[45px] xs:top-[50px] sm:top-[55px] w-full text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
                isEmailAvailable
                  ? "visible text-blue-400"
                  : !isEmailAvailable && email.trim()
                  ? "visible text-red-400"
                  : "hidden"
              )}
            >
              {emailMsg}
            </div>
          </div>
          <ButtonLarge label="인증하기" kind="check" />
        </>
      )}
    </div>
  );
}
