import { validatePassword } from "@/libs/validation-utils";
import { useState, useEffect } from "react";

interface UsePasswordCheckReturn {
  password: string;
  passwordConfirm: string;
  isValidPassword: boolean | null;
  isPasswordMatching: boolean | null;
  validationMessage: string;
  confirmMessage: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function usePasswordCheck(): UsePasswordCheckReturn {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean | null>(
    null
  );
  const [validationMessage, setValidationMessage] =
    useState<string>("비밀번호를 입력해주세요.");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);

    if (inputPassword.trim() === "") {
      setIsValidPassword(null);
      setValidationMessage("비밀번호를 입력해주세요.");
      setPasswordConfirm("");
    }
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPasswordConfrim = event.target.value;
    setPasswordConfirm(inputPasswordConfrim);

    if (inputPasswordConfrim.trim() === "") {
      setIsPasswordMatching(null);
      setConfirmMessage("");
    }
  };

  useEffect(() => {
    if (password) {
      if (
        validatePassword(password) &&
        password.length >= 8 &&
        password.length <= 20
      ) {
        setIsValidPassword(true);
        setValidationMessage("사용할 수 있는 비밀번호입니다.");
      } else {
        setIsValidPassword(false);
        setValidationMessage(
          "비밀번호는 8-20자, 문자, 숫자, 특수문자를 포함해야 합니다."
        );
        setPasswordConfirm("");
      }
    }

    if (isValidPassword && password && passwordConfirm) {
      setIsPasswordMatching(password === passwordConfirm);
      setConfirmMessage(
        password === passwordConfirm
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다."
      );
    } else {
      setConfirmMessage("");
    }
  }, [password, passwordConfirm, isValidPassword]);

  return {
    password,
    passwordConfirm,
    isValidPassword,
    isPasswordMatching,
    validationMessage,
    confirmMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  };
}
