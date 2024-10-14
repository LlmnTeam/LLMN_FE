import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTimer } from "./use-timer";
// import {
//   CheckEmailDuplication,
//   ResendCode,
//   VerifySignupCode,
// } from "../Signup02.queries";

const getSessionStorageKey = (email: string): string =>
  `emailRequestTimestamp_${email}`;

const calculateRemainingTime = (
  savedTimestamp: number,
  totalDuration: number = 180
): number => {
  const timePassed = Math.floor((Date.now() - savedTimestamp) / 1000);
  return totalDuration - timePassed;
};

interface UseEmailCheckReturn {
  email: string;
  code: string;
  isEmailAvailable: boolean | null;
  isCodeAvailable: boolean | null;
  emailMsg: string;
  codeMsg: string;
  timer: number;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // verifyEmail: () => Promise<void>;
  // verifyCode: () => Promise<void>;
  // resendCode: () => Promise<void>;
  // handledNextButton: (path: string) => void;
  handledNextButton: () => void;
}

// export const useEmailCheck = (selectedEmail: string): UseEmailCheckReturn => {
export const useEmailCheck = (): UseEmailCheckReturn => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    false
  );
  const [isCodeAvailable, setIsCodeAvailable] = useState<boolean | null>(null);
  const [emailMsg, setEmailMsg] = useState<string>("");
  const [codeMsg, setCodeMsg] = useState<string>("인증번호를 입력해주세요.");
  const router = useRouter();

  const { timer, startTimer, resetTimer } = useTimer(180);

  const validateLocalPart = (localPart: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+$/;
    return regex.test(localPart);
  };

  const validateDomainPart = (domainPart: string): boolean => {
    const regex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(domainPart);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (isEmailAvailable) {
      setCode("");
      setIsCodeAvailable(null);
      setCodeMsg("인증번호를 입력해주세요.");
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
    if (e.target.value.trim() === "") {
      setIsCodeAvailable(null);
      setCodeMsg("인증번호를 입력해주세요.");
    }
  };

  const handleEmailValidation = (): void => {
    if (email === "") {
      setIsEmailAvailable(false);
      setEmailMsg("");
    } else if (!email.includes("@")) {
      setIsEmailAvailable(false);
      setEmailMsg("'@'를 포함한 올바른 이메일 주소를 입력해주세요.");
    } else {
      const [localPart, domainPart] = email.split("@");

      if (!validateLocalPart(localPart)) {
        setIsEmailAvailable(false);
        setEmailMsg("영문, 숫자, 특수문자(._%+-)만 사용 가능합니다.");
      } else if (!validateDomainPart(domainPart)) {
        setIsEmailAvailable(false);
        setEmailMsg("올바른 도메인 형식을 입력해주세요. 예: domain.com");
      } else {
        setIsEmailAvailable(true);
        setEmailMsg("사용 가능한 이메일입니다.");
        resetTimer();
        startTimer();
      }
    }
  };

  // const verifyEmail = async (): Promise<void> => {
  //   if (!isEmailAvailable) return;

  //   try {
  //     const fullEmail = `${email}@${selectedEmail}`;
  //     const isAvailable = await CheckEmailDuplication(fullEmail);

  //     const sessionStorageKey = getSessionStorageKey(fullEmail);
  //     const savedTimestamp = sessionStorage.getItem(sessionStorageKey);

  //     if (isAvailable) {
  //       if (savedTimestamp) {
  //         const remaining = calculateRemainingTime(Number(savedTimestamp));
  //         if (remaining > 0 && remaining <= 180) {
  //           console.log("타이머 재설정 시작.");
  //           setIsEmailAvailable(true);
  //           setEmailMsg("인증번호를 이미 발송하였습니다.");
  //           resetTimer();
  //           startTimer(remaining);
  //         } else {
  //           sessionStorage.setItem(sessionStorageKey, Date.now().toString());
  //           setIsEmailAvailable(true);
  //           setEmailMsg("사용할 수 있는 이메일입니다.");
  //           resetTimer();
  //           startTimer(180);
  //         }
  //       } else {
  //         sessionStorage.setItem(sessionStorageKey, Date.now().toString());
  //         setIsEmailAvailable(true);
  //         setEmailMsg("사용할 수 있는 이메일입니다.");
  //         resetTimer();
  //         startTimer(180);
  //       }
  //     } else {
  //       setIsEmailAvailable(false);
  //       setEmailMsg("이미 존재하는 이메일입니다.");
  //     }
  //   } catch (error) {
  //     console.error("이메일 중복 확인 중 오류 발생:", error);
  //     setIsEmailAvailable(false);
  //     setEmailMsg("이메일 중복 확인 중 오류가 발생했습니다.");
  //   }
  // };

  // const verifyCode = async (): Promise<void> => {
  //   try {
  //     const fullEmail = `${email}@${selectedEmail}`;
  //     const isMatching = await VerifySignupCode(fullEmail, code);
  //     setIsCodeAvailable(isMatching ? true : false);
  //     setCodeMsg(
  //       isMatching ? "인증번호가 일치합니다." : "인증번호가 일치하지 않습니다."
  //     );
  //   } catch (error) {
  //     setIsCodeAvailable(false);
  //     setCodeMsg("인증번호 확인 중 오류가 발생했습니다.");
  //     console.error("인증번호 확인 중 오류 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     if (code) {
  //       await verifyCode();
  //     }
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, [code]);

  // useEffect(() => {
  //   if (timer === 0) {
  //     setIsCodeAvailable(false);
  //     setCode("");
  //     setCodeMsg("인증번호 확인 시간이 만료되었습니다.");
  //   }
  // }, [timer]);

  // const resendCode = async (): Promise<void> => {
  //   try {
  //     const fullEmail = `${email}@${selectedEmail}`;
  //     const result = await ResendCode(fullEmail);
  //     if (result) {
  //       setCode("");
  //       setIsCodeAvailable(null);
  //       setCodeMsg("인증번호를 입력해주세요.");
  //       resetTimer();
  //       startTimer(180);
  //     }
  //   } catch (error) {
  //     setCode("");
  //     setIsCodeAvailable(false);
  //     setCodeMsg("인증번호 요청 중 오류가 발생했습니다.");
  //     console.error("인증번호 요청 중 오류 발생:", error);
  //   }
  // };

  // const handledNextButton = (path: string): void => {
  const handledNextButton = (): void => {
    handleEmailValidation();
    // if (!isEmailAvailable || !isCodeAvailable) return;
    // sessionStorage.setItem("email", `${email}@${selectedEmail}`);
    // router.push(path);
  };

  return {
    email,
    code,
    isEmailAvailable,
    isCodeAvailable,
    emailMsg,
    codeMsg,
    timer,
    handleEmailChange,
    handleCodeChange,
    // verifyEmail,
    // verifyCode,
    // resendCode,
    handledNextButton,
  };
};
