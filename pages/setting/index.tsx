// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";
import Head from "next/head";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import { SettingPageProps, getSettingSSR } from "@/src/ssr/setting/setting-ssr";
import type { Nickname } from "@/src/types/login/login-type";
import type { Setting, SshInfo } from "@/src/types/setting/setting-type";
import { editSetting } from "@/src/api/setting/setting-api";

// 프로젝트 내부 훅과 유틸리티 함수
import useToggleButton from "@/src/hooks/commons/use-toggle-button";
import useNicknameCheck from "@/src/hooks/commons/use-nickname-check";
import useInstanceModal from "@/src/hooks/commons/use-instance-modal";
import useConfirmModal from "@/src/hooks/commons/use-confirm-modal";
import { cls } from "@/src/utils/class-utils";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import DropdownMenu from "@/src/components/commons/dropdown-menu";
import ToggleButton from "@/src/components/commons/toggle-button";
import Input from "@/src/components/commons/input";
import InstanceList from "@/src/components/setting/instance-list";
import ButtonSmall from "@/src/components/commons/button-small";
import InstanceModal from "@/src/components/commons/instance-modal";
import ConfirmModal from "@/src/components/commons/confirm-modal";

export const getServerSideProps: GetServerSideProps<SettingPageProps> =
  getSettingSSR;

export default function Setting({
  NicknameSSR,
  SettingSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: SettingPageProps) {
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const settingRef = useRef<Setting | null>(SettingSSR);
  const [sshList, setSshList] = useState<SshInfo[]>(
    settingRef.current?.sshInfos || []
  );
  const [selectedSshId, SetSelectedSshId] = useState<number | null>(
    SettingSSR?.monitoringSshId || null
  );
  const [monitoringSshHost, setMonitoringSshHost] = useState<string | null>(
    sshList
      ? sshList.find((ssh) => ssh.id === selectedSshId)?.remoteHost || null
      : null
  );

  const { isToggled, handleToggle } = useToggleButton(
    settingRef.current?.receivingAlarm ? true : false
  );

  const {
    nickname,
    isValidNickname,
    nicknameMsg,
    isNicknameEdited,
    handleNicknameChange,
  } = useNicknameCheck(SettingSSR?.nickName || "");

  const {
    isInstanceModalOpen,
    selectedOption,
    openInstanceModal,
    closeInstanceModal,
  } = useInstanceModal();

  const {
    isConfirmModalOpen,
    success,
    openConfirmModal,
    closeConfirmModal,
    setSuccess,
  } = useConfirmModal();

  const [disabled, setDisabled] = useState(true);

  const initialState = useRef({
    nickName: SettingSSR?.nickName,
    monitoringSshId: SettingSSR?.monitoringSshId,
    sshInfos: SettingSSR?.sshInfos,
    receivingAlarm: SettingSSR?.receivingAlarm,
  });

  useEffect(() => {
    const isChanged =
      nickname !== initialState.current.nickName ||
      selectedSshId !== initialState.current.monitoringSshId ||
      isToggled !== initialState.current.receivingAlarm ||
      !isEqual(sshList, initialState.current.sshInfos);

    setDisabled(isChanged && isValidNickname ? false : true);
  }, [nickname, selectedSshId, isToggled, sshList, isValidNickname]);

  const handleEditButton = async () => {
    if (disabled) return;
    const nickName = nickname;
    const receivingAlarm = isToggled;
    const sshInfos = sshList.map(
      ({ remoteName, remoteHost, remoteKeyPath }) => ({
        remoteName,
        remoteHost,
        remoteKeyPath,
      })
    );

    if (monitoringSshHost) {
      const result = await editSetting(
        nickName,
        receivingAlarm,
        monitoringSshHost,
        sshInfos
      );
      setSuccess(result);
      openConfirmModal();
    }
  };

  return (
    <>
      <Head>
        <title>LLMN - Setting</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
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
            <div className="flex flex-col justify-start items-center relative w-full mt-10 xs:mt-12 sm:mt-14">
              <Input
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleNicknameChange}
                maxWidth="1200px"
              />
              <div
                className={cls(
                  "w-full max-w-[1200px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                  isValidNickname ? "text-blue-400" : "text-red-400",
                  isNicknameEdited ? "visible" : "hidden"
                )}
              >
                {nicknameMsg}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full px-1 mt-6 xs:mt-7 sm:mt-8">
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
                  priority
                />
              </div>
            </div>
            <InstanceList
              monitoringSshId={selectedSshId}
              setMonitoringSshId={SetSelectedSshId}
              setMonitoringSshHost={setMonitoringSshHost}
              sshInfos={sshList}
              setSshInfos={setSshList}
            />
          </div>
          <div className="flex flex-row justify-end items-center w-full">
            <ButtonSmall
              label="수정"
              onClick={handleEditButton}
              disabled={disabled}
            />
          </div>
        </div>
        <InstanceModal
          isOpen={isInstanceModalOpen}
          onClose={closeInstanceModal}
          option={selectedOption}
          sshInfos={sshList}
          setSshInfos={setSshList}
        />
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          option="editSetting"
          success={success}
        />
      </Layout>
    </>
  );
}
