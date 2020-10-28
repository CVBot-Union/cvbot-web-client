export interface RTGroupDetail {
  success: boolean;
  response: RTGroupResponse;
}
export interface RTGroupResponse {
  property: RTGroupProperty;
  _id: string;
  members: (RTGroupMembersEntity)[] | [];
  trackers: (UserKVEntity)[] | [];
  name: string;
  __v: number;
}
export interface RTGroupProperty {
  themeColor: string;
  icon: string;
  description: string;
}
export interface RTGroupMembersEntity {
  id: string;
  username: string;
  job: string;
}

export interface UserKVEntity {
  nickname: string;
  _id: string;
  id: string;
  uid: string;
}

