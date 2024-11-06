import { fetchAlarmList } from "@/src/api/commons/header-api";
import { fetchInsightSummary } from "@/src/api/insight/insight-api";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { InsightSummary } from "@/src/types/insight/insight-type";
import { Nickname } from "@/src/types/login/login-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface InsightSummaryPageProps {
  NicknameSSR: Nickname | null;
  InsightSummarySSR: InsightSummary | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getInsightSummarySSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<InsightSummaryPageProps>> {
  const { type } = context.params as { type: string };
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, InsightSummarySSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchInsightSummary(type, accessToken),
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
      InsightSummarySSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
