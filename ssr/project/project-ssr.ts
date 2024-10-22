import { verifyAccessToken } from "@/api/login/login-check";
import { fetchProjectList } from "@/api/project/project-api";
import { Nickname } from "@/types/login/login-type";
import { ProjectList } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectPageProps {
  NicknameSSR: Nickname | null;
  ProjectListSSR: ProjectList | null;
}

export async function getProjectListSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, ProjectListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchProjectList(accessToken),
  ]);

  return {
    props: {
      NicknameSSR,
      ProjectListSSR,
    },
  };
}
