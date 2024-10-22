import { AccessToken, LoginResponse } from "@/types/login/login-type";

export const requestLoginToken = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {
      success,
      message,
      result,
    }: { success: boolean; message: string; result: AccessToken | null } =
      await response.json();
    return { success, message, result };
  } catch (error) {
    console.error("Failed to fetch login request, accessToken:", error);
    throw error;
  }
};
