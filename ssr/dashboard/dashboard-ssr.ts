import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  fetchDashboardData,
  fetchCloudInstanceList,
} from "@/api/dashboard/dashboard-api";
import {
  DashboardData,
  CloudInstanceList,
} from "@/types/dashboard/dashboard-type";

export interface DashboardPageProps {
  DashboardDataSSR: DashboardData | null;
  CloudInstanceListSSR: CloudInstanceList | null;
}

export async function getDashboardSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<DashboardPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [DashboardDataSSR, CloudInstanceListSSR] = await Promise.all([
    fetchDashboardData(accessToken),
    fetchCloudInstanceList(accessToken),
  ]);

  return {
    props: {
      DashboardDataSSR,
      CloudInstanceListSSR,
    },
  };
}
