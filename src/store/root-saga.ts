import { saga as loginSaga } from '@pages/login/store';

const sagaArr: (() => Generator)[] = [loginSaga];

export default sagaArr;
