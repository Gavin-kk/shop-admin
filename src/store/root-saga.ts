import { saga as loginSaga } from '@pages/login/store';
import { saga as classifySaga } from '@pages/category/store';
import { saga as productSaga } from '@pages/product/store';

const sagaArr: (() => Generator)[] = [loginSaga, classifySaga, productSaga];

export default sagaArr;
