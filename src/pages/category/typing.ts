import { IResponse } from '@src/common/types/sotre-types/response';

// /* Secondary_classification */
// export interface Secondary_classification {
//     id: number;
//     name: string;
//     createAt: number;
//     updateAt: number;
//     parent_category: number;
// }
//
// // 分类列表数据的描述
// export interface tsModel2 {
//     id: number;
//     parent_id: number;
//     category_name: string;
//     createAt: string;
//     updateAt: string;
//     secondary_classification: Secondary_classification[];
// }

export interface ICategory {
    id: number;
    parentId: number | null;
    categoryName: string;
    createAt: string;
    updateAt: string;
}
