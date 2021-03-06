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
  avatar?: string;
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
  // ????????????????????????????????????
    if (method === Method.EDIT) {
      // ?????????????????????????????????
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
    // ?????????????????? ???????????????????????????????????? imgs detail ??????????????????????????????
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
      status: '??????',
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
      return Promise.reject(new Error('???????????????'));
    }
    setClassifyValidateStatus('success');
    return Promise.resolve();
  };
  const isEdit = !!(method === Method.EDIT && detail);
  // ?????????????????????????????????
  const priceComponentProcessing = () => (isEdit ? (
    <PriceInput initValue={parseInt((detail!.price), 10)} />
  ) : <PriceInput />);
  // ????????????????????????????????????
  const processImageUploadDefaultData = () => (isEdit ? <GUpload imgs={JSON.parse(detail!.imgs) as string[]} /> : <GUpload imgs={[]} />);
  // ??????????????????
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
            label="????????????"
            rules={[{ required: true, message: '?????????????????????', whitespace: true }]}
            name="name"
          >
            <Input />
            {/* placeholder={method === Method.EDIT ? detail?.name : '?????????????????????'} */}
          </Form.Item>
          <Form.Item
            label="????????????"
            name="desc"
          >
            <TextArea rows={4} placeholder={method === Method.EDIT ? detail?.desc : '?????????????????????'} style={{ maxHeight: 140 }} />
          </Form.Item>

          <Form.Item
            label="????????????"
            rules={[{ required: true, message: '?????????????????????' }]}
            name="price"
          >
            {/* ???????????? */}
            {priceComponentProcessing()}
          </Form.Item>
          <Form.Item
            label="????????????"
            rules={[{ validator: validationCategorySelection, required: true }]}
            validateStatus={classifyValidateStatus}
            shouldUpdate
            name="classify"
          >
            {/* ???????????? */}
            {handlingCascadeSelection()}
          </Form.Item>
          <Form.Item
            label="????????????"
          >
            {/* ???????????? */}
            {processImageUploadDefaultData()}
          </Form.Item>
          <Form.Item
            label="????????????"
            name="detail"
          >
            {/* ?????????????????? */}
            { isEdit ? <RichTextEditor htmlText={detail!.detail} /> : <RichTextEditor /> }
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={() => form.submit()}>??????</Button>
          </Form.Item>
        </Form>
      </AddGoodsWrapper>
    </Card>
  );
};

export default memo(DetailsModification);
