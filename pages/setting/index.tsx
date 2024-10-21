import ButtonSmall from "@/components/commons/button-small";
import DropdownMenu from "@/components/commons/dropdown-menu";
import Input from "@/components/commons/input";
import InstanceModal from "@/components/commons/instance-modal";
import Layout from "@/components/commons/layout";
import ToggleButton from "@/components/commons/toggle-button";
import InstanceList from "@/components/setting/instance-list";
import useInstanceModal from "@/hooks/commons/use-instance-modal";
import useToggleButton from "@/hooks/commons/use-toggle-button";
import Image from "next/image";
import { useState } from "react";

export default function Setting() {
  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();

  const { isToggled, handleToggle } = useToggleButton();

  // 타입 정의: 인스턴스 이름(문자열)을 키로 하는 객체 타입
  type CheckedState = {
    [key: string]: boolean;
  };

  // 각 아이템의 체크 상태를 관리하는 상태
  const [isChecked, setIsChecked] = useState<CheckedState>({
    ubuntu: false,
    amazonLinux: false,
  });

  // 각 아이템의 체크 상태를 토글하는 함수
  const toggleCheck = (item: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="h-[640px] xs:h-[670px] sm:h-[700px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                설정
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <DropdownMenu options={["license", "key", "withdraw"]} />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full px-1 mt-6 xs:mt-7 sm:mt-8">
            <div className="text-[18px] xs:text-[20px] sm:text-[22px]">
              알람 설정
            </div>
            <ToggleButton isToggled={isToggled} onToggle={handleToggle} />
          </div>
          <div className="mt-10 xs:mt-12 sm:mt-14">
            <Input
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              maxWidth="1200px"
            />
            <div className="w-full text-[13px] xs:text-[14px] sm:text-[15px] font-semibold px-1 mt-0.5 text-gray-400">
              닉네임을 2자에서 8자 사이로 입력해주세요.
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full px-1 mt-3 xs:mt-4 sm:mt-5">
            <div className="text-[18px] xs:text-[20px] sm:text-[22px]">
              클라우드 인스턴스
            </div>
            <div>
              <Image
                src="/images/add-1.svg"
                alt="add-1"
                width={25}
                height={22}
                className="w-[19px] h-[16px] xs:w-[22px] xs:h-[19px] sm:w-[25px] sm:h-[22px] cursor-pointer"
                onClick={() => openInstanceModal("add")}
              />
            </div>
          </div>
          <InstanceList />
        </div>
        <div className="flex flex-row justify-end items-center w-full">
          <ButtonSmall label="수정" />
        </div>
      </div>
      <InstanceModal
        isOpen={isInstanceModalOpen}
        onClose={closeInstanceModal}
        option={selectedOption}
      />
    </Layout>
  );
}
