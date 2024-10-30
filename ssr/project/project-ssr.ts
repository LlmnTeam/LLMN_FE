import { fetchAlarmList } from "@/api/commons/header-api";
import { verifyAccessToken } from "@/api/login/login-api";
import { fetchProjectList } from "@/api/project/project-api";
import { AlarmList } from "@/types/commons/header-type";
import { Nickname } from "@/types/login/login-type";
import { ProjectList } from "@/types/project/project-type";
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
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      ProjectListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
