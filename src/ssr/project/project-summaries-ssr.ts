// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import { Nickname } from "@/src/types/login/login-type";
import {
  ProjectSummaryList,
  LogFileList,
} from "@/src/types/project/project-type";
import { AlarmList, Alarm } from "@/src/types/commons/header-type";
import { verifyAccessToken } from "@/src/api/login/login-api";
import {
  fetchProjectSummaryList,
  fetchLogFileList,
} from "@/src/api/project/project-api";
import { fetchAlarmList } from "@/src/api/commons/header-api";

export interface ProjectSummariesPageProps {
  NicknameSSR: Nickname | null;
  ProjectSummaryListSSR: ProjectSummaryList | null;
  LogFileListSSR: LogFileList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectSummariesSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectSummariesPageProps>> {
  const { id } = context.params as Params;
  const page = context.query.page as string;

  if (!id) {
    throw new Error("Missing project ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const pageNumber = page ? Number(page) - 1 : 0;

  const [NicknameSSR, ProjectSummaryListSSR, LogFileListSSR, AlarmListSSR] =
    await Promise.all([
      verifyAccessToken(accessToken),
      fetchProjectSummaryList(Number(id), pageNumber, accessToken),
      fetchLogFileList(Number(id), accessToken),
      fetchAlarmList(accessToken),
    ]);

  if (!NicknameSSR) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const unreadAlarmCount =
    AlarmListSSR?.alarms.filter((alarm: Alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      ProjectSummaryListSSR,
      LogFileListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
