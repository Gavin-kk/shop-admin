// form表单提交数据的类型
export type IFormType ={
    username:string,
    password:string,
    remember:boolean
};

// api接口响应数据的类型
export type Role = {
    menus: any;
}

export type Data = {
    _id: string;
    username: string;
    password: string;
    'create_time': number;
    __v: number;
    role: Role;
}

export interface IUserInfo {
    status: number;
    data?: Data;
    msg?:string
}
