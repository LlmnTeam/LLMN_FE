import ButtonSmall from "@/components/button-small";
import ConfirmModal from "@/components/confirm-modal";
import DropdownMenu from "@/components/dropdown-menu";
import Input from "@/components/input";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Setting() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openConfirmModal = (option: string) => {
    setSelectedOption(option);
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleMenuSelect = (option: string) => {
    if (option === "edit") return;
    openConfirmModal(option);
  };
  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="h-[640px] xs:h-[670px] sm:h-[700px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <Link href="/setting">
                <Image
                  src="/images/back.svg"
                  alt="back"
                  width={45}
                  height={45}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
                />
              </Link>
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
                API 키 관리
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
          <div className="mt-12 xs:mt-16 sm:mt-20">
            <Input
              type="text"
              label="Open AI Key"
              placeholder="닉네임을 입력해주세요."
              maxWidth="700px"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full max-w-[700px] rounded-md bg-[#F8F9FA] border border-[#E4E4E7] gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 mt-6 xs:mt-7 sm:mt-8">
            <ul className="list-disc pl-5">
              <li>OpenAI API 키는 openai.com에서 발급받으세요.</li>
              <li>API 키를 입력하지 않으면 일부 기능이 제한될 수 있습니다.</li>
              <li>
                과도한 API 사용은 추가 요금이 발생할 수 있으니 주의하세요.
              </li>
              <li>
                장기간 사용하지 않을 경우, 키를 비활성화하는 것을 권장합니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center w-full max-w-[700px] mt-12 xs:mt-16 sm:mt-20">
          <ButtonSmall label="수정" />
        </div>
      </div>
    </Layout>
  );
}
