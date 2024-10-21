import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchInsight } from "@/api/insight/insight-api";
import { Insight } from "@/types/insight/insight-type";

export interface InsightPageProps {
  InsightSSR: Insight | null;
}

export async function getInsightSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<InsightPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [InsightSSR] = await Promise.all([fetchInsight(accessToken)]);

  return {
    props: {
      InsightSSR,
    },
  };
}
