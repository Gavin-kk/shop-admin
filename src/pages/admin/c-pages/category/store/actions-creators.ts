import { IActionType } from '@src/common/types/sotre-types/action-type';
import { actionType } from '@pages/admin/c-pages/category/store/constant';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { ICategory } from '../typing';

export const getState = (state:IRootReducerStateType):IRootReducerStateType => state;

export const getAListOfFirstLevelCategoriesAction :IActionType = {
  type: actionType.GET_CLASSIFY_LIST,
};

export const changeAListOfFirstLevelCategoriesAction = (list:ICategory[]):IActionType => ({
  type: actionType.CHANGE_CLASSIFY_LIST,
  data: list,
});
//
export const addClassifyAction = (parentId:number | null, categoryName:string):IActionType => ({
  type: actionType.ADD_CLASSIFY,
  data: {
    parentId,
    categoryName,
  },
});

export const updateChangeClassifyAction = (categoryName:string, parentId:number):IActionType => ({
  type: actionType.UPDATE_CHANGE_CLASSIFY,
  data: {
    categoryName,
    parentId,
  },
});

export const deleteClassifyAction = (id:number):IActionType => ({
  type: actionType.DELETE_CLASSIFY,
  data: {
    id,
  },
});

// 通过父分类id获取子分类列表
export const getClassifyChildListAction = (id:number):IActionType => ({
  type: actionType.GET_CLASSIFY_CHILD_LIST,
  data: {
    id,
  },
});

// 更改当前分类的id
export const changeCurrentClassifyIdAction = (id:number):IActionType => ({
  type: actionType.CHANGE_CURRENT_CLASSIFY_ID,
  data: id,
});
