import { verifyAccessToken } from "@/api/login/login-check";
import { Nickname } from "@/types/login/login-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

interface ProtectedPageProps {
  NicknameSSR: Nickname | null;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProtectedPageProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const NicknameSSR = await verifyAccessToken(accessToken);

  if (!NicknameSSR) {
    return {
      redirect: {
        destination: "/login",
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
