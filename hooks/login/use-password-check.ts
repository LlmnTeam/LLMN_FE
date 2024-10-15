import { useState, useEffect } from "react";

const passwordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"[\]{}\\()|_-])\S*$/;

interface UsePasswordCheckReturn {
  password: string;
  passwordConfirm: string;
  isPasswordValid: boolean | null;
  isPasswordMatching: boolean | null;
  validationMessage: string;
  confirmMessage: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const usePasswordCheck = (): UsePasswordCheckReturn => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(false);
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean | null>(
    false
  );
  const [validationMessage, setValidationMessage] =
    useState<string>("비밀번호를 입력해주세요.");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
    if (event.target.value.trim() === "") {
      setIsPasswordValid(null);
      setValidationMessage("비밀번호를 입력해주세요.");
      setPasswordConfirm("");
    }
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordConfirm(event.target.value);
    if (event.target.value.trim() === "") {
      setIsPasswordMatching(null);
      setConfirmMessage("");
    }
  };

  useEffect(() => {
    if (password) {
      if (
        passwordPattern.test(password) &&
        password.length >= 8 &&
        password.length <= 20
      ) {
        setIsPasswordValid(true);
        setValidationMessage("사용할 수 있는 비밀번호입니다.");
      } else {
        setIsPasswordValid(false);
        setValidationMessage(
          "비밀번호는 8-20자, 문자, 숫자, 특수문자를 포함해야 합니다."
        );
        setPasswordConfirm("");
      }
    }

    if (isPasswordValid && password && passwordConfirm) {
      setIsPasswordMatching(password === passwordConfirm);
      setConfirmMessage(
        password === passwordConfirm
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다."
      );
    } else {
      setConfirmMessage("");
    }
  }, [password, passwordConfirm, isPasswordValid]);

  return {
    password,
    passwordConfirm,
    isPasswordValid,
    isPasswordMatching,
    validationMessage,
    confirmMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  };
};
