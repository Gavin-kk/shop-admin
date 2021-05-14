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
