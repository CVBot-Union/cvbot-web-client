export interface UserDetail {
  success: boolean;
  response: UserResponse;
}

export interface MetaUser {
  success: boolean;
  response: SlimResponse;
}

export interface SlimResponse {
  _id: string;
  username: string;
}

export interface UserResponse {
  user: User;
  rtgroups?: (SlimRtgroupsEntity)[] | null;
}
export interface User {
  optedOutTwitterIDs?: (string)[] | null;
  userLevel: number;
  _id: string;
  username: string;
  __v: number;
}

export interface SlimRtgroupsEntity {
  property: SlimProperty;
  _id: string;
  name: string;
}
export interface SlimProperty {
  themeColor: string;
  icon: string;
  description: string;
}
