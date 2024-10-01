import { useState } from "react";
import Input from "@/components/input";
import InputWithDropdown from "@/components/input-with-dropdown"; // 수정된 드롭다운 컴포넌트
import Layout from "@/components/layout";

export default function NewItem() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [containerName, setContainerName] = useState("");
  const cloudOptions = [
    "Ubuntu (54.180.244.93)",
    "Amazon Linux (72.180.244.93)",
    "연결하지 않음",
  ];
  const containerOptions = ["Spring", "FastAPI", "React", "연결하지 않음"];

  const handleCloudSelect = (name: string) => {
    setCloudName(name);
  };
  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-1 xs:gap-2">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              새로운 아이템
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              {"<주의>"} 컨테이너의 이름이 잘못 입력되면 기능이 정상적으로
              작동하지 않을 수 있습니다.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 xs:gap-7 sm:gap-8 mt-3 xs:mt-4 sm:mt-5">
          <Input
            type="text"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxWidth="1000px"
          />
          <Input
            type="text"
            label="설명"
            placeholder="설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxWidth="1000px"
          />
          <InputWithDropdown
            label="클라우드 인스턴스"
            placeholder="연결할 인스턴스를 선택해주세요."
            value={cloudName}
            options={cloudOptions}
            onSelect={handleCloudSelect}
            maxWidth="1000px"
          />
          <InputWithDropdown
            label="컨테이너"
            placeholder="연결할 컨테이너를 선택해주세요."
            value={containerName}
            options={containerOptions}
            onSelect={handleContainerSelect}
            maxWidth="1000px"
          />
          <div className="flex flex-row justify-end items-center w-full max-w-[1000px] mt-40 xs:mt-44 sm:mt-48">
            <button className="w-[64px] xs:w-[80px] h-[40px] xs:h-[50px] text-[16px] xs:text-[20px] text-white bg-[#0F172A] rounded-md">
              완료
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
