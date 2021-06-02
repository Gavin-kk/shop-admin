import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import {
  Form, Input, Button, Card,
} from 'antd';
import PriceInput from '@pages/product/components/price-input';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import RichTextEditor from '@components/rich-text-editor';
import { AddGoodsWrapper } from './style';
import GUpload from '../../components/upload';
import CascadeSelection from '../../components/cascade-selection';
import {
  addingGoodsAction,
  changeCurrentSelectedAction, changeGoodsDetailAction,
  changeTheContentOfTheRichTextEditorAction,
  changeUploadUrlListAction, getGoodsDetailAction, updateGoodsAction,
} from '../../store/action-creators';

export type Price ={
  number: number;
  currency: string;
}

export type Values ={
  name: string;
  desc: string;
  price: Price;
  detail: string;
}

export interface SubmitType {
  name: string;
  desc: string;
  imgs: string[] | undefined;
  status: string;
  classifyId?: number | null;
  price: number;
  detail: string | null;
  id?:number
}

export enum Method {
  ADD,
  EDIT
}

export interface IProps {
  method:Method
  editId?:number
}

const formItemLayout = { labelCol: { span: 2 }, wrapperCol: { span: 18, offset: 0.8 } };
const buttonItemLayout = { wrapperCol: { span: 2, offset: 2 } };

const { TextArea } = Input;

const DetailsModification: FC<IProps> = (props:IProps): ReactElement => {
  const { method, editId } = props;

  const {
    currentSelectedClassifyId, richTextEditorContent, imgs, detail,
  } = useSelector((state:IRootReducerStateType) => ({
    currentSelectedClassifyId: state.product.addProduct.currentSelectedClassifyId,
    richTextEditorContent: state.product.addProduct.richTextEditorContent,
    imgs: state.product.addProduct.UploadUrlList?.urls,
    detail: state.product.detail,
  }), shallowEqual);

  const [classifyValidateStatus, setClassifyValidateStatus] = useState<ValidateStatus>('success');
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
  // 判断本组件是更新还是添加
    if (method === Method.EDIT) {
      // 在这里决定是否请求数据
      dispatch(getGoodsDetailAction((editId as number)));
    }
  }, []);

  useEffect(() => {
    if (method === Method.EDIT) {
      form.setFieldsValue(
        {
          price:
            { number: detail?.price },
          name: detail?.name,
          desc: detail?.desc,
        },
      );
    }
  }, [detail]);

  useEffect(() => {
    if (currentSelectedClassifyId) {
      form.validateFields(['classify']);
    }
  }, [currentSelectedClassifyId]);

  useEffect(() => () => {
    // 当组件卸载时 删除所有子组件需要的数据 imgs detail 级联选择框的选项数组
    dispatch(changeCurrentSelectedAction(null));
    dispatch(changeTheContentOfTheRichTextEditorAction(null));
    dispatch(changeUploadUrlListAction(null));
    dispatch(changeGoodsDetailAction(null));
  }, []);

  const onFinish = ({ price, name, desc }:Values) => {
    const submitObj:SubmitType = {
      name,
      desc,
      imgs,
      status: '在售',
      classifyId: currentSelectedClassifyId,
      price: price.number,
      detail: richTextEditorContent,
    };
    if (method === Method.ADD) {
      dispatch(addingGoodsAction(submitObj));
    } else {
      delete submitObj.classifyId;
      submitObj.id = editId;
      dispatch(updateGoodsAction(submitObj));
    }
  };

  const validationCategorySelection = ():Promise<void> => {
    if (!currentSelectedClassifyId) {
      setClassifyValidateStatus('error');
      return Promise.reject(new Error('请选择分类'));
    }
    setClassifyValidateStatus('success');
    return Promise.resolve();
  };
  const isEdit = !!(method === Method.EDIT && detail);
  // 处理价格是添加还是修改
  const priceComponentProcessing = () => (isEdit ? (
    <PriceInput initValue={parseInt((detail!.price), 10)} />
  ) : <PriceInput />);
  // 处理图片上传默认显示那个
  const processImageUploadDefaultData = () => (isEdit ? <GUpload imgs={JSON.parse(detail!.imgs) as string[]} /> : <GUpload imgs={[]} />);
  // 处理级联选择
  const handlingCascadeSelection = () => (isEdit ? <CascadeSelection defaultSelection={detail!.classifyName} /> : <CascadeSelection />);
  return (
    <Card
      title={<Breadcrumbs />}
      style={{ width: '100%' }}
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
            name="name"
          >
            <Input />
            {/* placeholder={method === Method.EDIT ? detail?.name : '请输入商品名称'} */}
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
          >
            <TextArea rows={4} placeholder={method === Method.EDIT ? detail?.desc : '请输入商品描述'} style={{ maxHeight: 140 }} />
          </Form.Item>

          <Form.Item
            label="商品价格"
            rules={[{ required: true, message: '请输入商品价格' }]}
            name="price"
          >
            {/* 价格输入 */}
            {priceComponentProcessing()}
          </Form.Item>
          <Form.Item
            label="商品分类"
            rules={[{ validator: validationCategorySelection, required: true }]}
            validateStatus={classifyValidateStatus}
            shouldUpdate
            name="classify"
          >
            {/* 级联选择 */}
            {handlingCascadeSelection()}
          </Form.Item>
          <Form.Item
            label="商品图片"
          >
            {/* 图片上传 */}
            {processImageUploadDefaultData()}
          </Form.Item>
          <Form.Item
            label="商品详情"
            name="detail"
          >
            {/* 富文本编辑器 */}
            { isEdit ? <RichTextEditor htmlText={detail!.detail} /> : <RichTextEditor /> }
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={() => form.submit()}>提交</Button>
          </Form.Item>
        </Form>
      </AddGoodsWrapper>
    </Card>
  );
};

export default memo(DetailsModification);
