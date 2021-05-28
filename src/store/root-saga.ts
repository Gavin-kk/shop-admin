import { saga as loginSaga } from '@pages/login/store';
import { saga as classifySaga } from '@pages/admin/c-pages/category/store';

const sagaArr: (() => Generator)[] = [loginSaga, classifySaga];

export default sagaArr;
