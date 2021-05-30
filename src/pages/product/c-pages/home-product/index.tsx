import React, {
  FC, memo, ReactElement, useCallback, useEffect,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ProductWrapper } from '@pages/product/c-pages/home-product/style';
import {
  Button, Card, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import GSearch from '@components/search';
import { useHistory } from 'react-router-dom';
import GTable from '@pages/product/components/table';
import { debounce } from '@src/utils/debounce';
import {
  getProductListAction,
  getSearchListAction,
} from '../../store/action-creators';

const timer:number | null = null;
const HomeProduct: FC = (): ReactElement => {
  const { searchList } = useSelector((state: IRootReducerStateType) => ({
    searchList: state.product.searchList,
  }), shallowEqual);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductListAction);
  }, []);

  // 当用户选中或切换搜索下拉框中的option时会触发当前函数
  const handleChange = useCallback((value: number) => {
    // 跳转到详情页面
    history.push(`/admin/product/detail/${value}`);
  }, []);

  const handleSearch = useCallback((value: string) => {
    // 在这里更新数据列表
    const getSearchData = () => {
      if (value) {
        dispatch(getSearchListAction(1, 5, value));
      }
    };
    // 防抖
    debounce(800, getSearchData)();
  }, [dispatch]);

  return (
    <ProductWrapper>
      <Card
        title={(
          //  搜索
          <GSearch
            data={searchList}
            dataKey="ss_id"
            dataIndex="ss_name"
            handleChange={handleChange}
            handleSearch={handleSearch}
            placeholder="可通过商品名或商品描述搜索商品"
          />
)}
        extra={<Button type="primary" icon={<PlusOutlined />}>添加</Button>}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 表格 */}
        <GTable />
      </Card>
    </ProductWrapper>
  );
};

export default memo(HomeProduct);
