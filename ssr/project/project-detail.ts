import { fetchProjectDetail } from "@/api/project/project-api";
import { ProjectDetail } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectDetailPageProps {
  ProjectDetailSSR: ProjectDetail | null;
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

  const [ProjectDetailSSR] = await Promise.all([
    fetchProjectDetail(Number(id), accessToken),
  ]);

  return {
    props: {
      ProjectDetailSSR,
    },
  };
}
