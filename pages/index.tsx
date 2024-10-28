import Logo from "@/components/commons/logo";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen gap-8 xs:gap-9 sm:gap-10 px-6 pb-[15vh] overflow-y-auto overflow-x-hidden"
      onClick={() => router.push("/login")}
    >
      <Logo />
    </div>
  );
}
