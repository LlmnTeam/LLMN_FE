import { fetchProjectList } from "@/api/project/project-api";
import { ProjectList } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectPageProps {
  ProjectListSSR: ProjectList | null;
}

export async function getProjectListSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [ProjectListSSR] = await Promise.all([fetchProjectList(accessToken)]);

  return {
    props: {
      ProjectListSSR,
    },
  };
}
