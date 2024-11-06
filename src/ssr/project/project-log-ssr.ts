import { fetchAlarmList } from "@/src/api/commons/header-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import {
  fetchLogFileList,
  fetchLogMessage,
} from "@/src/api/project/project-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { Nickname } from "@/src/types/login/login-type";
import { LogFileList, LogMessage } from "@/src/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectLogMessagePageProps {
  NicknameSSR: Nickname | null;
  LogMessageSSR: LogMessage | null;
  LogFileListSSR: LogFileList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
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

  const [NicknameSSR, LogMessageSSR, LogFileListSSR, AlarmListSSR] =
    await Promise.all([
      verifyAccessToken(accessToken),
      fetchLogMessage(Number(id), file, accessToken),
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
      LogMessageSSR,
      LogFileListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
