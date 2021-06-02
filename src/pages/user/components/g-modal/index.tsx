import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';
import {
  Card, Form, Input, message, Modal,
} from 'antd';
import { RuleObject } from 'rc-field-form/lib/interface';
import { IFormValues } from '@pages/user/typing';
import { useDispatch } from 'react-redux';
import { addUserAction, getUserListAction } from '../../store/action-creators';

interface IProps {
  isModalVisible:boolean
  handleCancel:() => void
  changeIsModalVisible:(show:boolean) => void
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const GModal: FC<IProps> = ({
  isModalVisible,
  handleCancel,
  changeIsModalVisible,
}): ReactElement => {
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => () => {
    form.resetFields();
  }, []);

  const onOk = async () => {
    //  在这里执行发送网络请求
    const values:IFormValues = await form.validateFields();
    dispatch(addUserAction(values));
    changeIsModalVisible(false);
  };

  const lengthCheck = (rule:RuleObject, value:string): Promise<never | void> => {
    switch (true) {
      case !value:
      case !value.trim().length:
        return Promise.reject(new Error('这是是必填的'));
      case value.trim().length < 5:
        return Promise.reject(new Error('长度不得少于5'));
      default:
        return Promise.resolve();
    }
  };
  const phoneCheck = (rule:RuleObject, value:string): Promise<never | void> => {
    const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/;
    if (!phoneReg.test(value)) {
      return Promise.reject(new Error('手机号格式不正确'));
    }
    return Promise.resolve();
  };
  const emailCheck = (rule:RuleObject, value:string): Promise<never | void> => {
    const emailReg = /^[^_$].{4,}@(163|126|qq|sina)\.(com|cn|net)$/;
    if (!emailReg.test(value)) {
      return Promise.reject(new Error('邮箱格式不正确'));
    }
    return Promise.resolve();
  };

  return (
    <Modal title="添加用户" visible={isModalVisible} onOk={onOk} onCancel={handleCancel} okText="提交" cancelText="取消">
      <Form
        name="basic"
        {...layout}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        form={form}
        // onFinishFailed={onFinishFailed}
      >

        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, validator: lengthCheck }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, validator: lengthCheck }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="手机"
          name="phone"
          rules={[{ required: false, validator: phoneCheck }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, validator: emailCheck }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="角色名称"
          name="role_id"
          rules={[{ required: false, message: 'Please input your username!' }]}
        >
          <Input placeholder="这个先放一放" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(GModal);
