// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import { Nickname } from "@/src/types/login/login-type";
import { AlarmList, Alarm } from "@/src/types/commons/header-type";
import { verifyAccessToken } from "@/src/api/login/login-api";
import { fetchAlarmList } from "@/src/api/commons/header-api";

export interface ValidateLoginProps {
  NicknameSSR: Nickname | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getValidateLoginSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ValidateLoginProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
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
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
