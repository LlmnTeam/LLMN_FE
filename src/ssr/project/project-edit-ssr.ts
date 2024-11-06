import { fetchAlarmList } from "@/src/api/commons/header-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { fetchProjectInfo } from "@/src/api/project/project-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { Nickname } from "@/src/types/login/login-type";
import { ProjectInfo } from "@/src/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectEditPageProps {
  NicknameSSR: Nickname | null;
  ProjectInfoSSR: ProjectInfo | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectEditSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectEditPageProps>> {
  const { id } = context.params as Params;

  if (!id) {
    throw new Error("Missing pet ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, ProjectInfoSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchProjectInfo(Number(id), accessToken),
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
      ProjectInfoSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
