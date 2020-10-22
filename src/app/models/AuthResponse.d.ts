export interface AuthLogin {
  success: boolean;
  response: AuthLoginResponse;
}
export interface AuthLoginResponse {
  token: string;
}

interface AuthCreateResponseRootObject {
  success: boolean;
  response: AuthCreateResponseObject;
}

interface AuthCreateResponseObject {
  optedOutTwitterIDs: string[];
  userLevel: number;
  _id: string;
  username: string;
  __v: number;
}
