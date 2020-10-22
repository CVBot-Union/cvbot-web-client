export interface RTGroupDetail {
  success: boolean;
  response: RTGroupResponse;
}

export interface RTGroupResponse {
  property: RTGroupProperty;
  _id: string;
  members?: (RTGroupMembersEntity)[] | null;
  leaders?: (RTGroupMembersEntity)[] | null;
  name: string;
  __v: number;
}
export interface RTGroupProperty {
  themeColor: string;
  icon: string;
  description: string;
}
export interface RTGroupMembersEntity {
  dutyDescription: string;
  _id: string;
  id: string;
}

export interface RTGroupMeta {
  success: boolean;
  response: RTGroupMetaResponse;
}
export interface RTGroupMetaResponse {
  group: RTGroupMetaGroup;
  userKV?: (UserKVEntity)[] | null;
}
export interface RTGroupMetaGroup {
  property: RTGroupProperty;
  _id: string;
  name: string;
}
export interface UserKVEntity {
  nickname: string;
  _id: string;
  id: string;
  uid: string;
}

