import { useEffect, useState } from "react";
import Input from "@/components/commons/input";
import InputWithDropdown from "@/components/commons/input-with-dropdown";
import Layout from "@/components/commons/layout";
import ButtonSmall from "@/components/commons/button-small";
import useNewItemInput from "@/hooks/new-item/use-new-item-input";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { CloudInstanceList } from "@/types/new-item/new-item";
import { fetchCloudInstanceList } from "@/api/new-item/new-item-api";
import { ParsedUrlQuery } from "querystring";

interface NewItemPageProps {
  CloudInstanceListSSR: CloudInstanceList | null;
}

export const getServerSideProps: GetServerSideProps<NewItemPageProps> = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<NewItemPageProps>> => {
  const accessToken = context.req.cookies?.accessToken || "";

  let CloudInstanceListSSR: CloudInstanceList | null = null;

  if (accessToken) {
    CloudInstanceListSSR = await fetchCloudInstanceList(accessToken);
  }

  return {
    props: {
      CloudInstanceListSSR,
    },
  };
};

export default function NewItem({ CloudInstanceListSSR }: NewItemPageProps) {
  const {
    projectName,
    description,
    cloudName,
    containerName,
    cloudOptions,
    containerOptions,
    handleProjectNameChange,
    handleDescriptionChange,
    handleCloudSelect,
    handleContainerSelect,
    setCloudData,
  } = useNewItemInput();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setCloudData(CloudInstanceListSSR);
  }, []);

  useEffect(() => {
    setDisabled(
      projectName && description && cloudName && containerName ? false : true
    );
  }, [projectName, description, cloudName, containerName]);

  return (
    <Layout>
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
          <Input
            type="text"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            value={projectName}
            onChange={handleProjectNameChange}
            maxWidth="1200px"
          />
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
            <ButtonSmall label="생성" disabled={disabled} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
