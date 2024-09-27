import Input from "@/components/input";
import Layout from "@/components/layout";
import Image from "next/image";

export default function NewItem() {
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-1 xs:gap-2">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              새로운 아이템
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              {"<주의>"} 컨테이너의 이름을 추후에 변경하면 기능이 정상적으로
              작동하지 않을 수 있습니다.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 xs:gap-7 sm:gap-8 mt-3 xs:mt-4 sm:mt-5">
          <Input
            type="text"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            maxWidth="1000px"
          />
          <Input
            type="text"
            label="설명"
            placeholder="설명을 입력해주세요."
            maxWidth="1000px"
          />
          <Input
            type="email"
            label="컨테이너 이름"
            placeholder="연결할 컨테이너를 선택해주세요."
            maxWidth="1000px"
          />
          <div className="flex flex-row justify-end items-center w-full max-w-[1000px] mt-40 xs:mt-44 sm:mt-48">
            <button className="w-[64px] xs:w-[80px] h-[40px] xs:h-[50px] text-[16px] xs:text-[20px] text-white bg-[#0F172A] rounded-md">
              생성
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
