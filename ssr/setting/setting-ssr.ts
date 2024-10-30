import { fetchAlarmList } from "@/api/commons/header-api";
import { verifyAccessToken } from "@/api/login/login-api";
import { fetchSetting } from "@/api/setting/setting-api";
import { AlarmList } from "@/types/commons/header-type";
import { Nickname } from "@/types/login/login-type";
import { Setting } from "@/types/setting/setting-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface SettingPageProps {
  NicknameSSR: Nickname | null;
  SettingSSR: Setting | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getSettingSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<SettingPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, SettingSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchSetting(accessToken),
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
      SettingSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
