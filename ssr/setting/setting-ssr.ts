import { fetchSetting } from "@/api/setting/setting-api";
import { Setting } from "@/types/setting/setting-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface SettingPageProps {
  SettingSSR: Setting | null;
}

export async function getSettingSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<SettingPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [SettingSSR] = await Promise.all([fetchSetting(accessToken)]);

  return {
    props: {
      SettingSSR,
    },
  };
}
