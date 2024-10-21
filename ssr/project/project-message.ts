// import { fetchProjectSummaryList } from "@/api/project/project-api";
// import { ProjectSummaryList } from "@/types/project/project-type";
// import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
// import { ParsedUrlQuery } from "querystring";

// export interface ProjectSummaryListPageProps {
//   ProjectSummaryListSSR: ProjectSummaryList | null;
// }

// export interface Params extends ParsedUrlQuery {
//   id: string;
// }

// export async function getProjectSummaryListSSR(
//   context: GetServerSidePropsContext<ParsedUrlQuery>
// ): Promise<GetServerSidePropsResult<ProjectSummaryListPageProps>> {
//   const { id } = context.params as Params;

//   if (!id) {
//     throw new Error("Missing pet ID");
//   }
//   const accessToken = context.req.cookies?.accessToken || "";

//   const [ProjectSummaryListSSR] = await Promise.all([
//     fetchProjectSummaryList(Number(id), 0, accessToken),
//   ]);

//   return {
//     props: {
//       ProjectSummaryListSSR,
//     },
//   };
// }
// import { fetchProjectSummaryList } from "@/api/project/project-api";
// import { ProjectSummaryList } from "@/types/project/project-type";
// import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
// import { ParsedUrlQuery } from "querystring";

// export interface ProjectSummaryListPageProps {
//   ProjectSummaryListSSR: ProjectSummaryList | null;
// }

// export interface Params extends ParsedUrlQuery {
//   id: string;
// }

// export async function getProjectSummaryListSSR(
//   context: GetServerSidePropsContext<ParsedUrlQuery>
// ): Promise<GetServerSidePropsResult<ProjectSummaryListPageProps>> {
//   const { id } = context.params as Params;

//   if (!id) {
//     throw new Error("Missing pet ID");
//   }
//   const accessToken = context.req.cookies?.accessToken || "";

//   const [ProjectSummaryListSSR] = await Promise.all([
//     fetchProjectSummaryList(Number(id), 0, accessToken),
//   ]);

//   return {
//     props: {
//       ProjectSummaryListSSR,
//     },
//   };
// }
