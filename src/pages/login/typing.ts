// form表单提交数据的类型
export type IFormType ={
    username:string,
    password:string,
    remember:boolean
};

// api接口响应数据的类型
/* User */
export interface User {
    id: number;
    username: string;
    phone: string | null;
    email: string | null;
    createAt: string;
    updateAt: string;
}

/* Data */
export interface Data {
    user: User;
    token: string;
}

export interface IResponse {
    code: number;
    message: string;
}
/* LoginResponse */
export interface ILoginResponse extends IResponse{
    data: Data;
}

export interface UserResponse extends IResponse{
    data:User;
}
