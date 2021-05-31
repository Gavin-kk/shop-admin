import React, {
  FC, ReactElement, memo,
} from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import {
  Form, Input, Button, Card,
} from 'antd';
import PriceInput from '@pages/product/components/price-input';
import { shallowEqual, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { AddGoodsWrapper } from './style';
import GUpload from '../../components/upload';
import CascadeSelection from '../../components/cascade-selection';

const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12, offset: 1 } };
const buttonItemLayout = { wrapperCol: { span: 6, offset: 7 } };

export type Price ={
  number: number;
  currency: string;
}

export type Values ={
  productName: string;
  desc: string;
  price: Price;
  detail: string;
}

const AddProduct: FC = (): ReactElement => {
  const { currentSelectedClassifyId } = useSelector((state:IRootReducerStateType) => ({
    currentSelectedClassifyId: state.product.addProduct.currentSelectedClassifyId,
  }), shallowEqual);
  const [form] = Form.useForm();

  const submit = () => {
    form.submit();
  };
  const onFinish = (values:Values) => {
    console.log(JSON.stringify(values));
  };

  const validationCategorySelection = ():Promise<any> => {
    if (!currentSelectedClassifyId) {
      return Promise.reject(new Error('请选择分类'));
    }
    return Promise.resolve();
  };

  return (
    <Card
      title={<Breadcrumbs />}
      style={{ width: '100%', height: '100%' }}
    >
      <AddGoodsWrapper>
        <Form
          {...formItemLayout}
          layout="horizontal"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称', whitespace: true }]}
            name="productName"
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
          >
            <Input placeholder="请输入商品描述" />
          </Form.Item>
          <Form.Item
            label="商品价格"
            rules={[{ required: true, message: '请输入商品价格' }]}
            name="price"
          >
            {/* 价格输入 */}
            <PriceInput />
          </Form.Item>
          <Form.Item
            label="商品分类"
            rules={[{ validator: validationCategorySelection }]}
            name="classify"
          >
            {/* 级联选择 */}
            <CascadeSelection />
          </Form.Item>
          <Form.Item
            label="商品图片"
            name="imgs"
          >
            {/* 图片上传 */}
            <GUpload />
          </Form.Item>
          <Form.Item
            label="商品详情"
            name="detail"
          >
            <Input />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={submit}>提交</Button>
          </Form.Item>
        </Form>
      </AddGoodsWrapper>
    </Card>
  );
};

export default memo(AddProduct);
