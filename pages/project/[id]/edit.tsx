// 외부 라이브러리
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// 서버사이드 데이터, 타입 및 API
import {
  ProjectEditPageProps,
  getProjectEditSSR,
} from "@/src/ssr/project/project-edit-ssr";
import type { Nickname } from "@/src/types/login/login-type";
import type { ProjectInfo } from "@/src/types/project/project-type";
import { editProjectInfo } from "@/src/api/project/project-api";

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

export const getServerSideProps: GetServerSideProps<ProjectEditPageProps> =
  getProjectEditSSR;

export default function ProjectEdit({
  NicknameSSR,
  ProjectInfoSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ProjectEditPageProps) {
  const router = useRouter();
  const { id } = router.query;

  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const projectInfoRef = useRef<ProjectInfo | null>(ProjectInfoSSR);

  const {
    projectName,
    description,
    cloudName,
    containerName,
    isValidProjectName,
    projectNameMsg,
    isProjectNameEdited,
    handleProjectNameChange,
    handleDescriptionChange,
    handleContainerSelect,
  } = useProjectInfoInput({
    initialProjectName: projectInfoRef.current?.projectName,
    initialDescription: projectInfoRef.current?.description,
    initialCloudName: "",
    initialContainerName: projectInfoRef.current?.usingContainerName,
    initialCloudInstances: null,
  });

  const {
    isConfirmModalOpen,
    success,
    openConfirmModal,
    closeConfirmModal,
    setSuccess,
  } = useConfirmModal();

  const containerNames: string[] = projectInfoRef.current
    ? projectInfoRef.current?.containers.map(
        (container) => container.containerName
      )
    : [];
  containerNames.push("연결하지 않음");

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      projectInfoRef.current &&
      projectInfoRef.current.projectName === projectName &&
      projectInfoRef.current.description === description &&
      projectInfoRef.current.usingContainerName === containerName
    )
      setDisabled(true);
    else setDisabled(false);
  }, [projectName, description, containerName]);

  const handleEditButton = async () => {
    if (disabled) return;
    const result = await editProjectInfo(
      Number(id),
      projectName,
      description,
      containerName
    );
    setSuccess(result);
    openConfirmModal();
  };

  return (
    <>
      <Head>
        <title>LLMN - {projectName} Edit</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-start items-start gap-1 xs:gap-2">
              <div className="flex flex-row justify-start items-center">
                <Link href={`/project/${id}`}>
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    width={45}
                    height={45}
                    className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px] cursor-pointer"
                    priority
                  />
                </Link>
                <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
                  수정하기
                </span>
              </div>
              <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
                {"<주의>"} 컨테이너의 이름이 잘못 입력되면 기능이 정상적으로
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
                  isValidProjectName ? "text-blue-400" : "text-red-400",
                  isProjectNameEdited ? "visible" : "hidden"
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
              label="컨테이너"
              placeholder={
                cloudName
                  ? "연결할 컨테이너를 선택해주세요."
                  : "먼저 클라우드를 선택하세요."
              }
              value={containerName}
              options={containerNames}
              onSelect={handleContainerSelect}
              maxWidth="1200px"
            />
            <div className="flex flex-row justify-end items-center w-full mt-12 xs:mt-16 sm:mt-20">
              <ButtonSmall
                label="수정"
                onClick={handleEditButton}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          option="editProjectInfo"
          success={success}
          id={Number(id)}
        />
      </Layout>
    </>
  );
}
