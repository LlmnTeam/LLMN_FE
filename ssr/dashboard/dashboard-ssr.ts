import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  fetchDashboard,
  fetchCloudInstanceList,
} from "@/api/dashboard/dashboard-api";
import { CloudInstanceList, Dashboard } from "@/types/dashboard/dashboard-type";

export interface DashboardPageProps {
  DashboardSSR: Dashboard | null;
  CloudInstanceListSSR: CloudInstanceList | null;
}

export async function getDashboardSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<DashboardPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [DashboardSSR, CloudInstanceListSSR] = await Promise.all([
    fetchDashboard(accessToken),
    fetchCloudInstanceList(accessToken),
  ]);

  return {
    props: {
      DashboardSSR,
      CloudInstanceListSSR,
    },
  };
}
