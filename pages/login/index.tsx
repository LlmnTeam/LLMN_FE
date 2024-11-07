// 외부 라이브러리
import { GetServerSideProps } from "next";
import Head from "next/head";

// 서버사이드 데이터, 타입 및 API
import { LoginSSRProps, getLoginSSR } from "@/src/ssr/login/login-ssr";

// 프로젝트 내부 훅과 유틸리티 함수
import useLoginCheck from "@/src/hooks/login/use-login-check";

// 프로젝트 내부 컴포넌트
import Logo from "@/src/components/commons/logo";
import Input from "@/src/components/commons/input";
import ButtonLarge from "@/src/components/commons/button-large";
import ConfirmModal from "@/src/components/commons/confirm-modal";

export const getServerSideProps: GetServerSideProps<LoginSSRProps> =
  getLoginSSR;

export default function Login() {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    verifyLogin,
    setIsLoginFailed,
    LoginFailedMsg,
    isConfirmModalOpen,
    closeConfirmModal,
  } = useLoginCheck();

  return (
    <>
      <Head>
        <title>LLMN - Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center w-screen full-height gap-8 xs:gap-9 sm:gap-10 px-6 pb-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="w-full max-w-[605px] mx-auto mt-4 xs:mt-5 sm:mt-6">
          <Input
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="w-full max-w-[605px] mx-auto mt-1 xs:mt-2 sm:mt-3">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <ButtonLarge label="로그인" kind="login" onClick={verifyLogin} />
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsLoginFailed(false);
            closeConfirmModal();
          }}
          option="loginFailure"
          message={LoginFailedMsg}
        />
      </div>
    </>
  );
}
