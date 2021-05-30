//
// export interface List {
//     id: number;
//     name: string;
//     desc: string;
//     price: string;
//     detail: string;
//     imgs: string;
//     createAt: string;
//     updateAt: string;
//     status: string;
// }

// 商品数据的类型
export interface IProduct{
    id: number;
    name: string;
    desc: string;
    price: string;
    imgs: string;
    status: string;
    createAt: string;
    updateAt: string;
    classifyName: string;
}

// 搜索的数据类型
export interface ISearch {
    ss_id: number;
    ss_name: string;
    ss_desc: string;
    ss_price: string;
    ss_detail: string;
    ss_imgs: string;
    ss_createAt: string;
    ss_updateAt: string;
    ss_status: string;
}

// 详情的数据类型
export interface IDetails {
    id: number;
    name: string;
    desc: string;
    price: string;
    imgs: string;
    status: string;
    detail: string;
    createAt: string;
    updateAt: string;
    classifyName: string;
}
