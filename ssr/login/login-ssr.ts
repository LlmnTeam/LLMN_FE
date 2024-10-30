import { verifyAccessToken } from "@/api/login/login-api";
import { Nickname } from "@/types/login/login-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface LoginSSRProps {
  NicknameSSR: Nickname | null;
}

export async function getLoginSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<LoginSSRProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR] = await Promise.all([verifyAccessToken(accessToken)]);

  if (NicknameSSR) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      NicknameSSR,
    },
  };
}
