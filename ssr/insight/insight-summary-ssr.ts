import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchInsightSummary } from "@/api/insight/insight-api";
import { InsightSummary } from "@/types/insight/insight-type";

export interface InsightSummaryPageProps {
  InsightSummarySSR: InsightSummary | null;
}

export async function getInsightSummarySSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<InsightSummaryPageProps>> {
  const { type } = context.params as { type: string };
  const accessToken = context.req.cookies?.accessToken || "";

  const [InsightSummarySSR] = await Promise.all([
    fetchInsightSummary(type, accessToken),
  ]);

  return {
    props: {
      InsightSummarySSR,
    },
  };
}
