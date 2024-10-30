import { fetchAlarmList } from "@/api/commons/header-api";
import { verifyAccessToken } from "@/api/login/login-api";
import { fetchCloudInstanceList } from "@/api/new-item/new-item-api";
import { AlarmList } from "@/types/commons/header-type";
import { Nickname } from "@/types/login/login-type";
import { CloudInstanceList } from "@/types/new-item/new-item-type";
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
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      CloudInstanceListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
