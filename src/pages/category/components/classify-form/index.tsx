import React, {
  FC, ReactElement, memo, useCallback,
} from 'react';
import { Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { addClassifyAction, updateChangeClassifyAction } from '@pages/category/store/actions-creators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { DropDownMenuWrapper } from './style';

const { Option } = Select;

export enum UseMethod {
  Alter,
  Add
}

interface IProps {
    show:boolean
    handleOk:(form:FormInstance<any>)=>void
    handleCancel:(empty:()=>void)=>void
    useMethod: UseMethod
    title:string
    row: { value:string, id:number|null}
}

const ClassifyForm: FC<IProps> = (props:IProps): ReactElement => {
  const {
    show, handleCancel, handleOk, useMethod, title, row,
  } = props;

  const { classifyList, currentId } = useSelector((state:IRootReducerStateType) => ({
    classifyList: state.classify.classifyList,
    currentId: state.classify.currentId,
  }), shallowEqual);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const addClassify = useCallback((values: { categoryName:string, parentId:number | undefined }) => {
    switch (true) {
      case useMethod === UseMethod.Add:
        // 增加
        if (currentId === null && !values.parentId) {
          // 添加一级分类
          dispatch(addClassifyAction(null, values.categoryName));
        } else if (values.parentId) {
          // 添加多级分类
          dispatch(addClassifyAction(values.parentId, values.categoryName));
        } else if (currentId) {
          // 默认添加某一级分类
          dispatch(addClassifyAction(currentId, values.categoryName));
        }
        break;
      default: // 默认为修改
        dispatch(updateChangeClassifyAction(values.categoryName, (row.id as number)));
        break;
    }
  }, [dispatch, useMethod, row, currentId]);

  const clearForm = useCallback(() => {
    form.resetFields();
  }, []);

  return (
    <Modal
      title={title}
      visible={show}
      onOk={() => handleOk(form)}
      onCancel={() => handleCancel(clearForm)}
    >
      <DropDownMenuWrapper>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          name="basic"
          onFinish={addClassify}
          form={form}
        >
          { useMethod === UseMethod.Add && (
          <Form.Item
            label="新建分类"
            name="parentId"
            rules={[{ required: false, message: '' }]}
          >
            <Select
              showSearch
              style={{ width: 315 }}
              placeholder="默认添加当前分类"
              optionFilterProp="children"
              allowClear
              filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {classifyList.map((item) => (
                <Option value={item.id} key={item.id}>{ item.categoryName }</Option>
              ))}
            </Select>
          </Form.Item>
          ) }
          <Form.Item
            label="分类名"
            name="categoryName"
            initialValue=""
            rules={[{ required: true, message: '分类名称是必填的' }]}
          >
            <Input
              placeholder={useMethod === UseMethod.Alter ? row.value : ''}
            />
          </Form.Item>
          {/* 下面这个表单没有任何实际意义 只是因为在修改分类是 form表单内只有一个 input 所以回车会直接触发form的submit事件
              所以在这里加一个隐藏的input */}
          <input type="text" style={{ display: 'none' }} />
        </Form>
      </DropDownMenuWrapper>

    </Modal>
  );
};

export default memo(ClassifyForm);
