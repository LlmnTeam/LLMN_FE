import { fetchCloudInstanceList } from "@/api/new-item/new-item-api";
import { CloudInstanceList } from "@/types/new-item/new-item-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface NewItemPageProps {
  CloudInstanceListSSR: CloudInstanceList | null;
}

export async function getNewItemSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<NewItemPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [CloudInstanceListSSR] = await Promise.all([
    fetchCloudInstanceList(accessToken),
  ]);

  return {
    props: {
      CloudInstanceListSSR,
    },
  };
}
