import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchInsight } from "@/api/insight/insight-api";
import { Insight } from "@/types/insight/insight-type";
import { Nickname } from "@/types/login/login-type";
import { verifyAccessToken } from "@/api/login/login-api";
import { fetchAlarmList } from "@/api/commons/header-api";
import { AlarmList } from "@/types/commons/header-type";

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
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      InsightSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
