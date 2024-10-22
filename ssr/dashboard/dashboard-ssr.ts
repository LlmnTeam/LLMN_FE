import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  fetchDashboard,
  fetchCloudInstanceList,
} from "@/api/dashboard/dashboard-api";
import { CloudInstanceList, Dashboard } from "@/types/dashboard/dashboard-type";
import { verifyAccessToken } from "@/api/login/login-check";
import { Nickname } from "@/types/login/login-type";

export interface DashboardPageProps {
  nicknameSSR: Nickname | null;
  DashboardSSR: Dashboard | null;
  CloudInstanceListSSR: CloudInstanceList | null;
}

export async function getDashboardSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<DashboardPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [nicknameSSR, DashboardSSR, CloudInstanceListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchDashboard(accessToken),
    fetchCloudInstanceList(accessToken),
  ]);

  if (nicknameSSR === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      nicknameSSR,
      DashboardSSR,
      CloudInstanceListSSR,
    },
  };
}
