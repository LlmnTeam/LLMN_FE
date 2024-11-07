// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import { Nickname } from "@/src/types/login/login-type";
import {
  Dashboard,
  CloudInstanceList,
} from "@/src/types/dashboard/dashboard-type";
import { AlarmList, Alarm } from "@/src/types/commons/header-type";
import { verifyAccessToken } from "@/src/api/login/login-api";
import {
  fetchCloudInstanceList,
  fetchDashboard,
} from "@/src/api/dashboard/dashboard-api";
import { fetchAlarmList } from "@/src/api/commons/header-api";

export interface DashboardPageProps {
  NicknameSSR: Nickname | null;
  DashboardSSR: Dashboard | null;
  CloudInstanceListSSR: CloudInstanceList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getDashboardSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<DashboardPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, DashboardSSR, CloudInstanceListSSR, AlarmListSSR] =
    await Promise.all([
      verifyAccessToken(accessToken),
      fetchDashboard(accessToken),
      fetchCloudInstanceList(accessToken),
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
      DashboardSSR,
      CloudInstanceListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
