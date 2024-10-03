import ConfirmModal from "@/components/confirm-modal";
import DropdownMenu from "@/components/dropdown-menu";
import InputMedium from "@/components/input-medium";
import InstanceModal from "@/components/instance-modal";
import Layout from "@/components/layout";
import ToggleButton from "@/components/toggle-button";
import Image from "next/image";
import { useState } from "react";

export default function Setting() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInstanceModalOpen, setIsInstanceModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isToggled, setIsToggled] = useState(false);

  const openConfirmModal = (option: string) => {
    setSelectedOption(option);
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const openInstanceModal = () => setIsInstanceModalOpen(true);
  const closeInstanceModal = () => setIsInstanceModalOpen(false);

  const handleMenuSelect = (option: string) => {
    if (option === "edit") return;
    openConfirmModal(option);
  };

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="h-[650px] xs:h-[685px] sm:h-[720px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2 xs:gap-5">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                설정
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-0.5">
              <div>
                <DropdownMenu
                  options={["license", "key", "withdraw"]}
                  onSelect={handleMenuSelect}
                />
                <ConfirmModal
                  isOpen={isConfirmModalOpen}
                  onClose={closeConfirmModal}
                  option={selectedOption}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full max-w-[700px] px-1 mt-6 xs:mt-7 sm:mt-8">
            <div className="text-[18px] xs:text-[20px] sm:text-[22px]">
              알람 설정
            </div>
            <ToggleButton isToggled={isToggled} onToggle={handleToggle} />
          </div>
          <div className="mt-14">
            <InputMedium
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              maxWidth="700px"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full max-w-[700px] px-1 mt-3 xs:mt-4 sm:mt-5">
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
                onClick={openInstanceModal}
              />
              <InstanceModal
                isOpen={isInstanceModalOpen}
                onClose={closeInstanceModal}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-full max-w-[700px] min-h-[380px] rounded-md shadow-md border border-[#E5E7EB] gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-5 py-5 xs:py-6 sm:py-7 mt-3 xs:mt-4 sm:mt-5">
            <div className="flex flex-row justify-start items-center w-full rounded-xl bg-[#F4F4F5] py-1 text-[12px] xs:text-[15px] sm:text-[18px] font-medium">
              <div className="flex flex-row justify-center items-center w-[13%]">
                <Image
                  src="/images/check.svg"
                  alt="check"
                  width={26}
                  height={28}
                  className="w-[18px] h-[20px] xs:w-[22px] xs:h-[24px] sm:w-[26px] sm:h-[28px]"
                />
              </div>
              <div className="w-[25%] truncate">ubuntu</div>
              <div className="w-[25%] text-center truncate">54.180.244.93</div>
              <div className="w-[25%] text-center truncate">정상</div>
              <div className="w-[12%]">
                <Image
                  src="/images/minus.svg"
                  alt="minus"
                  width={30}
                  height={31}
                  className="w-[22px] h-[23px] xs:w-[26px] xs:h-[27px] sm:w-[30px] sm:h-[31px]"
                />
              </div>
            </div>
            <div className="flex flex-row justify-start items-center w-full rounded-xl bg-[#F4F4F5] py-1 text-[12px] xs:text-[15px] sm:text-[18px] font-medium">
              <div className="flex flex-row justify-center items-center w-[13%]">
                {/* <Image
                src="/images/check.svg"
                alt="check"
                width={26}
                height={28}
                className="w-[18px] h-[20px] xs:w-[22px] xs:h-[24px] sm:w-[26px] sm:h-[28px]"
              /> */}
              </div>
              <div className="w-[25%] truncate">Amazon Linux</div>
              <div className="w-[25%] text-center truncate">72.180.244.93</div>
              <div className="w-[25%] text-center truncate">재연결 필요</div>
              <div className="w-[12%]">
                <Image
                  src="/images/minus.svg"
                  alt="minus"
                  width={30}
                  height={31}
                  className="w-[22px] h-[23px] xs:w-[26px] xs:h-[27px] sm:w-[30px] sm:h-[31px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center w-full max-w-[700px] font-semibold">
          <button className="w-[52px] xs:w-[58px] sm:w-[64px] h-[29px] xs:h-[32px] sm:h-[36px] text-[14px] xs:text-[15px] sm:text-[16px] text-white bg-[#0F172A] rounded-md">
            수정
          </button>
        </div>
      </div>
    </Layout>
  );
}
