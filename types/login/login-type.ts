export interface AccessToken {
  accessToken: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  result: AccessToken | null;
}
