import { fetchAlarmList } from "@/src/api/commons/header-api";
import { fetchCloudInstanceList } from "@/src/api/dashboard/dashboard-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { Nickname } from "@/src/types/login/login-type";
import { CloudInstanceList } from "@/src/types/new-item/new-item-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface NewItemPageProps {
  NicknameSSR: Nickname | null;
  CloudInstanceListSSR: CloudInstanceList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getNewItemSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<NewItemPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, CloudInstanceListSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchCloudInstanceList(accessToken),
    fetchAlarmList(accessToken),
  ]);

  if (NicknameSSR === null) {
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
      CloudInstanceListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
