// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import type { Nickname } from "@/src/types/login/login-type";
import type { ProjectList } from "@/src/types/project/project-type";
import type { AlarmList, Alarm } from "@/src/types/commons/header-type";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { fetchProjectList } from "@/src/api/project/project-api";
import { fetchAlarmList } from "@/src/api/commons/header-api";

export interface ProjectPageProps {
  NicknameSSR: Nickname | null;
  ProjectListSSR: ProjectList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getProjectListSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, ProjectListSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchProjectList(accessToken),
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
      ProjectListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
