import { fetchAlarmList } from "@/src/api/commons/header-api";
import { fetchInsight } from "@/src/api/insight/insight-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { Insight } from "@/src/types/insight/insight-type";
import { Nickname } from "@/src/types/login/login-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface InsightPageProps {
  NicknameSSR: Nickname | null;
  InsightSSR: Insight | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getInsightSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<InsightPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, InsightSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchInsight(accessToken),
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
      InsightSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
