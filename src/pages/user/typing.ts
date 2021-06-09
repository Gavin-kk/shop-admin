export interface IUserList {
  id: number;
  username: string;
  phone: string | null;
  email: string | null;
  avatar?: string;
  createAt: number;
  updateAt: number;
  role_id: number | null;
  auth_name:string | null;
  role_name:string | null
}
// form 提交的类型
export interface IFormValues {
  id?:number;
  username: string;
  password: string;
  phone: string;
  email: string;
  avatar?: string;
  roleId?: number
}

/* 用户详情的 类型UserInfo */
export interface IUserInfo {
  id: number;
  username: string;
  password: string;
  phone: string | null;
  email: string | null;
  avatar?: string;
  createAt: number;
  updateAt: number;
  roleId: number;
}

// 用户详情的角色类型
export interface Role {
  id: number;
  roleName: string;
  authTime: number;
  authName: string;
  createAt: string;
  updateAt: string;
  menu: string[] | null;
}

export interface IGetUserInfoResponse {
  userInfo: IUserInfo;
  role: Role;
}
