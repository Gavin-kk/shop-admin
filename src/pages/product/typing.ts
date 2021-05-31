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
import { IResponse } from '@src/common/types/sotre-types/response';

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
    classifyName: string[];
}

// 文件上传相应的数据类型
export interface IUploadDate {
    names: string[];
    imgPath: string[];
}

// 添加商品页面 请求的分类数据的类型
export interface IClassify {
    id: number;
    parentId: number | null;
    categoryName: string;
    createAt: string;
    updateAt: string;
}
