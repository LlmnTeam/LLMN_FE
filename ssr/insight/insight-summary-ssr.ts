import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchInsightSummary } from "@/api/insight/insight-api";
import { InsightSummary } from "@/types/insight/insight-type";
import { Nickname } from "@/types/login/login-type";
import { verifyAccessToken } from "@/api/login/login-api";
import { AlarmList } from "@/types/commons/header-type";
import { fetchAlarmList } from "@/api/commons/header-api";

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
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      InsightSummarySSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
