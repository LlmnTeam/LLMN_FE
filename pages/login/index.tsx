import ButtonLarge from "@/components/commons/button-large";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-8 xs:gap-9 sm:gap-10 px-6 pb-[15vh] overflow-y-auto overflow-x-hidden">
      <Logo />
      <Input type="email" label="이메일" placeholder="이메일을 입력해주세요." />
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
      />
      <ButtonLarge label="로그인" kind="login" />
    </div>
  );
}
