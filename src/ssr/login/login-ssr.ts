// 외부 라이브러리
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

// 서버 사이드 데이터, 타입 및 API
import type { Nickname } from "@/src/types/login/login-type";
import { verifyAccessToken } from "@/src/api/login/login-api";

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
