export interface UserDetail {
  success: boolean;
  response: UserResponse;
}
export interface UserResponse {
  user: User;
  rtgroups?: (SlimRtgroupsEntity)[] | null;
}
export interface BatchUsers {
  success: boolean;
  response: SlimUserResponse[];
}
export interface SlimUserResponse {
  _id: string;
  username: string;
  isManager?: boolean;
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
  isManager: boolean;
}
export interface SlimProperty {
  themeColor: string;
  icon: string;
  description: string;
}
