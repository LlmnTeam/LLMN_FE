import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { ProjectDetail } from "@/types/log/log-type";
import { fetchProjectDetail } from "@/api/log/log-api";

export interface LogDetailPageProps {
  ProjectDetailSSR: ProjectDetail | null;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectDetailSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<LogDetailPageProps>> {
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
