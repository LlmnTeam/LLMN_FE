import { fetchAlarmList } from "@/src/api/commons/header-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { fetchProjectList } from "@/src/api/project/project-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { Nickname } from "@/src/types/login/login-type";
import { ProjectList } from "@/src/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

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
