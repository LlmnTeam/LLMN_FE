import {
  fetchLogFileList,
  fetchProjectDetail,
} from "@/api/project/project-api";
import { LogFileList, ProjectDetail } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectDetailPageProps {
  ProjectDetailSSR: ProjectDetail | null;
  LogFileListSSR: LogFileList | null;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectDetailSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectDetailPageProps>> {
  const { id } = context.params as Params;

  if (!id) {
    throw new Error("Missing pet ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const [ProjectDetailSSR, LogFileListSSR] = await Promise.all([
    fetchProjectDetail(Number(id), accessToken),
    fetchLogFileList(Number(id), accessToken),
  ]);

  return {
    props: {
      ProjectDetailSSR,
      LogFileListSSR,
    },
  };
}
