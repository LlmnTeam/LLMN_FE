import { verifyAccessToken } from "@/api/login/login-check";
import { fetchProjectSummaryList } from "@/api/project/project-api";
import { Nickname } from "@/types/login/login-type";
import { ProjectSummaryList } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectSummaryListPageProps {
  NicknameSSR: Nickname | null;
  ProjectSummaryListSSR: ProjectSummaryList | null;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectSummaryListSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectSummaryListPageProps>> {
  const { id } = context.params as Params;

  if (!id) {
    throw new Error("Missing project ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, ProjectSummaryListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchProjectSummaryList(Number(id), 0, accessToken),
  ]);

  return {
    props: {
      NicknameSSR,
      ProjectSummaryListSSR,
    },
  };
}
