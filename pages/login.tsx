import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-3 px-6 pb-[15vh] overflow-hidden">
      <div className="flex flex-row justify-center items-center gap-3 mb-4">
        <Image src="/images/logo.svg" alt="logo" width={46} height={54} />
        <span className="text-3xl font-semibold">LLMN</span>
      </div>
      <Input name="email" label="이메일" />
      <Input name="password" label="비밀번호" />
      <Button label="로그인" kind="login" />
    </div>
  );
}
