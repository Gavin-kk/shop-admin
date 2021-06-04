export interface IRoleList {
  id: number;
  roleName: string;
  authTime: string;
  authName: string;
  createAt: string;
  updateAt: string;
  menu: string[];
  parentMenu: string[]
}

export type RoleType = {
  id?:number
  roleName:string
  menu:string[]
  authTime?:string
  parentMenu:string[]
}
