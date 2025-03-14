// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";

// 서버사이드 데이터, 타입 및 API
import {
  NewItemPageProps,
  getNewItemSSR,
} from "@/src/ssr/new-item/new-item-ssr";
import type { Nickname } from "@/src/types/login/login-type";
import { CreateNewProject } from "@/src/api/new-item/new-item-api";

// 프로젝트 내부 훅과 유틸리티 함수
import useProjectInfoInput from "@/src/hooks/commons/use-project-info-input";
import useConfirmModal from "@/src/hooks/commons/use-confirm-modal";
import { cls } from "@/src/utils/class-utils";

// 프로젝트 내부 컴포넌트
import Layout from "@/src/components/commons/layout";
import Input from "@/src/components/commons/input";
import InputWithDropdown from "@/src/components/commons/input-with-dropdown";
import ButtonSmall from "@/src/components/commons/button-small";
import ConfirmModal from "@/src/components/commons/confirm-modal";

export const getServerSideProps: GetServerSideProps<NewItemPageProps> =
  getNewItemSSR;

export default function NewItem({
  NicknameSSR,
  CloudInstanceListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: NewItemPageProps) {
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const {
    projectName,
    description,
    cloudName,
    containerName,
    sshInfoId,
    cloudOptions,
    containerOptions,
    isValidProjectName,
    projectNameMsg,
    handleProjectNameChange,
    handleDescriptionChange,
    handleCloudSelect,
    handleContainerSelect,
  } = useProjectInfoInput({
    initialProjectName: "",
    initialDescription: "",
    initialCloudName: "",
    initialContainerName: "",
    initialCloudInstances: CloudInstanceListSSR,
  });

  const {
    isConfirmModalOpen,
    success,
    openConfirmModal,
    closeConfirmModal,
    setSuccess,
  } = useConfirmModal();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      isValidProjectName && description && cloudName && containerName
        ? false
        : true
    );
  }, [isValidProjectName, description, cloudName, containerName]);

  const handleCreateButton = async (
    projectName: string,
    description: string,
    sshInfoId: number | null,
    containerName: string
  ) => {
    if (sshInfoId === null) return;
    const result = await CreateNewProject(
      projectName,
      description,
      sshInfoId,
      containerName
    );
    setSuccess(result);
    openConfirmModal();
  };

  return (
    <>
      <Head>
        <title>LLMN - New Item</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-start items-start gap-1 xs:gap-1.5 sm:gap-2">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                새로운 아이템
              </span>
              <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
                {"<주의>"} 컨테이너의 이름을 추후에 변경하면 기능이 정상적으로
                작동하지 않을 수 있습니다.
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-12 xs:gap-14 sm:gap-16 mt-12 xs:mt-14 sm:mt-16">
            <div className="flex flex-col justify-start items-center relative w-full">
              <Input
                type="text"
                label="프로젝트 이름"
                placeholder="이름을 입력해주세요."
                value={projectName}
                onChange={handleProjectNameChange}
                maxWidth="1200px"
              />
              <div
                className={cls(
                  "w-full max-w-[1200px] absolute top-[44px] xs:top-[49px] sm:top-[54px] text-[11px] xs:text-[12px] sm:text-[13px] font-semibold px-1 mt-0.5",
                  isValidProjectName ? "text-blue-400" : "text-red-400"
                )}
              >
                {projectNameMsg}
              </div>
            </div>
            <Input
              type="text"
              label="설명"
              placeholder="설명을 입력해주세요."
              value={description}
              onChange={handleDescriptionChange}
              maxWidth="1200px"
            />
            <InputWithDropdown
              label="클라우드 인스턴스"
              placeholder="연결할 인스턴스를 선택해주세요."
              value={cloudName}
              options={cloudOptions}
              onSelect={handleCloudSelect}
              maxWidth="1200px"
            />
            <InputWithDropdown
              label="컨테이너"
              placeholder={
                cloudName
                  ? "연결할 컨테이너를 선택해주세요."
                  : "먼저 클라우드를 선택하세요."
              }
              value={containerName}
              options={containerOptions}
              onSelect={handleContainerSelect}
              maxWidth="1200px"
              disabled={!cloudName}
            />
            <div className="flex flex-row justify-end items-center w-full mt-12 xs:mt-16 sm:mt-20">
              <ButtonSmall
                label="생성"
                onClick={() =>
                  handleCreateButton(
                    projectName,
                    description,
                    sshInfoId,
                    containerName
                  )
                }
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          option="createNewProject"
          success={success}
        />
      </Layout>
    </>
  );
}
