import { verifyAccessToken } from "@/api/login/login-check";
import { fetchLogMessage } from "@/api/project/project-api";
import { Nickname } from "@/types/login/login-type";
import { LogMessage } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectLogMessagePageProps {
  NicknameSSR: Nickname | null;
  LogMessageSSR: LogMessage | null;
}

export interface Params extends ParsedUrlQuery {
  id: string;
  file: string;
}

export async function getProjectLogMessageSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectLogMessagePageProps>> {
  const { id, file } = context.params as Params;

  if (!id) {
    throw new Error("Missing project ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, LogMessageSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchLogMessage(Number(id), file, accessToken),
  ]);

  return {
    props: {
      NicknameSSR,
      LogMessageSSR,
    },
  };
}
