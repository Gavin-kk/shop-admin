export interface IUserList {
  id: number;
  username: string;
  phone: string | null;
  email: string | null;
  createAt: number;
  updateAt: number;
  role_id: number | null;
  auth_name:string | null;
  role_name:string | null
}

export interface IFormValues {
  username: string;
  password: string;
  phone: string;
  email: string;
  role_id?: number
}
