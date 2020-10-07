export interface AuthLogin {
  success: boolean;
  response: AuthLoginResponse;
}
export interface AuthLoginResponse {
  token: string;
}
