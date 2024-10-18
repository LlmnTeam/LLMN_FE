import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import { requestLoginToken } from "@/api/login/login-check";

// 훅의 반환 타입 정의
interface UseLoginCheckReturn {
  email: string;
  password: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  verifyLogin: () => Promise<void>;
  isLoginFailed: boolean;
}

export const useLoginCheck = (): UseLoginCheckReturn => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
  };

  const verifyLogin = async (): Promise<void> => {
    if (email === "" || password === "") return;

    try {
      const data = await requestLoginToken(email, password);
      console.log(data);

      if (data.accessToken) {
        // accessToken을 쿠키에 저장
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          httpOnly: false,
          sameSite: "Lax",
          path: "/",
        });

        setIsLoginFailed(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = JSON.parse(error.message).message;
      console.log("errorMessage: ", errorMessage);

      setIsLoginFailed(true);
      console.error("로그인 안됨:", error);
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    verifyLogin,
    isLoginFailed,
  };
};
