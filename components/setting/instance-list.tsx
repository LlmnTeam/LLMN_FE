import useInstanceModal from "@/hooks/commons/use-instance-modal";
import Image from "next/image";
import InstanceModal from "../commons/instance-modal";
import { useState } from "react";
import { cls } from "@/utils/class-utils";

interface SSHInfo {
  remoteName: string;
  remoteHost: string;
  remoteKeyPath: string;
}

interface SSHListProps {
  sshInfos: SSHInfo[];
  monitoringSshHost: string | null;
  setMonitoringSshHost: (host: string) => void;
}

// export default function InstanceList({
//   sshInfos,
//   monitoringSshHost,
//   setMonitoringSshHost,
// }: SSHListProps) {
export default function InstanceList() {
  const [selectedSSH, setSelectedSSH] = useState<SSHInfo>({
    remoteName: "",
    remoteHost: "",
    remoteKeyPath: "",
  });

  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();

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

  // const handleSelectHost = (host: string) => {
  //   setMonitoringSshHost(host);
  // };

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-[1200px] h-[310px] xs:h-[330px] sm:h-[340px] gap-2 xs:gap-2.5 sm:gap-3 py-1 overflow-y-scroll overflow-x-hidden custom-scrollbar">
      {/* {sshInfos.map((ssh) => (
        <div
          className="flex flex-row justify-start items-center w-full rounded-xl bg-[#F4F4F5] py-2 text-[12px] xs:text-[15px] sm:text-[18px] font-medium border border-transparent hover:border-gray-400 cursor-pointer"
          key={`${ssh.remoteName}${ssh.remoteHost}`}
          onClick={() => handleSelectHost(ssh.remoteHost)}
        >
          <div className="flex flex-row justify-center items-center w-[15%]">
            <Image
              src="/images/check.svg"
              alt="check"
              width={25}
              height={27}
              className={cls(
                "w-[18px] h-[20px] xs:w-[22px] xs:h-[24px] sm:w-[25px] sm:h-[27px]",
                ssh.remoteHost === monitoringSshHost ? "visible" : "hidden"
              )}
            />
          </div>
          <div className="w-[30%] truncate">{ssh.remoteName}</div>
          <div className="w-[40%] truncate">{ssh.remoteHost}</div>
          <div className="w-[15%]">
            <Image
              src="/images/info.svg"
              alt="info"
              width={26}
              height={27}
              className="w-[22px] h-[23px] xs:w-[26px] xs:h-[27px]"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedSSH(ssh);
                openInstanceModal("edit");
              }}
            />
          </div>
        </div>
      ))} */}
      <div className="flex flex-col justify-start items-center w-full min-h-[300px] rounded-md shadow-md border border-[#E5E7EB] gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-5 py-5 xs:py-6 sm:py-7 mt-3 xs:mt-4 sm:mt-5 overflow-y-auto overflow-x-hidden">
        <div
          className="flex flex-row justify-start items-center w-full rounded-xl bg-[#F4F4F5] py-2 text-[12px] xs:text-[15px] sm:text-[18px] font-medium border border-transparent hover:border-gray-400 cursor-pointer"
          onClick={() => toggleCheck("ubuntu")}
        >
          <div className="flex flex-row justify-center items-center w-[13%]">
            {isChecked.ubuntu && (
              <Image
                src="/images/check.svg"
                alt="check"
                width={25}
                height={27}
                className="w-[18px] h-[20px] xs:w-[22px] xs:h-[24px] sm:w-[25px] sm:h-[27px]"
              />
            )}
          </div>
          <div className="w-[25%] truncate">ubuntu</div>
          <div className="w-[25%] text-center truncate">54.180.244.93</div>
          <div className="w-[25%] text-center truncate">정상</div>
          <div className="w-[12%]">
            <Image
              src="/images/info.svg"
              alt="info"
              width={26}
              height={27}
              className="w-[20px] h-[21px] xs:w-[23px] xs:h-[24px] sm:w-[26px] sm:h-[27px]"
              onClick={() => openInstanceModal("edit")}
            />
          </div>
        </div>
        <div
          className="flex flex-row justify-start items-center w-full rounded-xl bg-[#F4F4F5] py-2 text-[12px] xs:text-[15px] sm:text-[18px] font-medium border border-transparent hover:border-gray-400 cursor-pointer"
          onClick={() => toggleCheck("amazonLinux")}
        >
          <div className="flex flex-row justify-center items-center w-[13%]">
            {isChecked.amazonLinux && (
              <Image
                src="/images/check.svg"
                alt="check"
                width={25}
                height={27}
                className="w-[18px] h-[20px] xs:w-[22px] xs:h-[24px] sm:w-[25px] sm:h-[27px]"
              />
            )}
          </div>
          <div className="w-[25%] truncate">Amazon Linux</div>
          <div className="w-[25%] text-center truncate">72.180.244.93</div>
          <div className="w-[25%] text-center truncate">재연결 필요</div>
          <div className="w-[12%]">
            <Image
              src="/images/info.svg"
              alt="info"
              width={26}
              height={27}
              className="w-[20px] h-[21px] xs:w-[23px] xs:h-[24px] sm:w-[26px] sm:h-[27px]"
              onClick={() => openInstanceModal("edit")}
            />
          </div>
        </div>
      </div>
      <InstanceModal
        isOpen={isInstanceModalOpen}
        onClose={closeInstanceModal}
        option={selectedOption}
        ssh={selectedSSH}
      />
    </div>
  );
}
