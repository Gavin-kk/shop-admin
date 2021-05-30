export interface IResponse<T> {
    msg?:string
    message?:string
    code?:number
    status?:number
    data:T
}
