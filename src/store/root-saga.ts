import { saga as loginSaga } from '@pages/login/store';
import { saga as classifySaga } from '@pages/category/store';
import { saga as productSaga } from '@pages/product/store';
import { saga as userSaga } from '@pages/user/store';
import { saga as roleSaga } from '@pages/role/store';
import { saga as orderSaga } from '@pages/order/store';

const sagaArr: (() => Generator)[] = [loginSaga, classifySaga, productSaga, userSaga, roleSaga, orderSaga];

export default sagaArr;
