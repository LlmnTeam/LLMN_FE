import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { ProjectList } from "@/types/log/log-type";
import { fetchProjectList } from "@/api/log/log-api";

export interface LogPageProps {
  ProjectListSSR: ProjectList | null;
}

export async function getProjectListSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<LogPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [ProjectListSSR] = await Promise.all([fetchProjectList(accessToken)]);

  return {
    props: {
      ProjectListSSR,
    },
  };
}
