import { takeEvery, put } from 'redux-saga/effects';
import { actionType } from '../common/types/action-type';
import { ActionTypeConstant } from './constant';

function* changeListProcessing(action: actionType) {
  yield console.log(action);
}
function* Saga():Generator {
  // 第一个参数 actiontype 第二个参数是自己的生成器处理函数
  yield takeEvery(ActionTypeConstant.changelist, changeListProcessing);
}
const sagaArr: (() => Generator)[] = [Saga];
export default sagaArr;
