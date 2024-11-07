// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import { Nickname } from "@/src/types/login/login-type";
import { Setting } from "@/src/types/setting/setting-type";
import { AlarmList, Alarm } from "@/src/types/commons/header-type";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { fetchSetting } from "@/src/api/setting/setting-api";
import { fetchAlarmList } from "@/src/api/commons/header-api";

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
    AlarmListSSR?.alarms.filter((alarm: Alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      SettingSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
