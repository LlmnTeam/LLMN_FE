import type { AlarmList } from "@/src/types/commons/header-type";
import Cookies from "js-cookie";

export async function fetchAlarmList(
  accessToken: string
): Promise<AlarmList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/alarms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const { result }: { result: AlarmList | null } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch project summary list:", error);
    return null;
  }
}

export async function submitAlarmRead(alarmId: number): Promise<boolean> {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/alarms/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        alarmIds: [alarmId],
      }),
    });

    const { success }: { success: boolean } = await response.json();
    return success;
  } catch (error) {
    console.error("Failed to fetch project summary list:", error);
    return false;
  }
}
