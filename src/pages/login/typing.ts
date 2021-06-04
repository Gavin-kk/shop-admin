// form表单提交数据的类型
export type IFormType ={
    username:string,
    password:string,
    remember:boolean
};

/* Role */
export interface Role {
    id: number;
    roleName: string;
    authTime: string;
    authName: string;
    createAt: string;
    updateAt: string;
    menu: string[];
    parentMenu: string[]
}
// api接口响应数据的类型
/* User */
export interface User {
    id: number;
    username: string;
    phone: string | null;
    email: string | null;
    roleId:number | null;
    role:Role;
    createAt: string;
    updateAt: string;
}

/* Data */
export interface Data {
    user: User;
    token: string;
}
