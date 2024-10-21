import {
  LogFileList,
  ProjectDetail,
  ProjectList,
  ProjectSummaryList,
} from "@/types/project/project-type";
import Cookies from "js-cookie";

export async function fetchProjectList(
  accessToken: string
): Promise<ProjectList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/project`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: ProjectList | null } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function refreshProjectList(): Promise<ProjectList | null> {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/project/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: ProjectList | null } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function fetchProjectDetail(
  projectId: number,
  accessToken: string
): Promise<ProjectDetail | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: ProjectDetail | null } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function fetchLogFileList(
  projectId: number,
  accessToken: string
): Promise<LogFileList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/project/${projectId}/logs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: LogFileList | null } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function fetchProjectSummaryList(
  projectId: number,
  page: number,
  accessToken: string
): Promise<ProjectSummaryList | null> {
  try {
    console.log("Fetching project summary list");
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${baseURL}/project/${projectId}/logs/summaries?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: ProjectSummaryList | null } =
      await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch project summary list:", error);
    return null;
  }
}

export async function fetchProjectInfo(
  projectId: number,
  accessToken: string
): Promise<ProjectSummaryList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/project/${projectId}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: ProjectSummaryList | null } =
      await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch project summary list:", error);
    return null;
  }
}
