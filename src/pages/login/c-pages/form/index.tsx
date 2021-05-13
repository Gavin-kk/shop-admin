import React, {
  FC, ReactElement, memo, useState, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import {
  Button, Checkbox, Form, Input,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { IFormType } from '@pages/login/types/form-submit-type';
import { sendLoginRequestAction } from '@pages/login/store/actions-creators';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type callbackType = (rule: any, value: string, cb: any) => void

const MForm: FC = (): ReactElement => {
  const [remember, setRemember] = useState<boolean>(true);
  // const [form] = Form.useForm();// 使用表单方法
  const dispatch = useDispatch();

  const onFinish = (userInput: IFormType) => {
    // 表单验证成功
    dispatch(sendLoginRequestAction(userInput));
  };

  const onFinishFailed = (errorInfo: any) => {
    // 验证失败
    console.log('Failed:', errorInfo);
  };

  // 表单验证
  const verifyUsername:callbackType = useCallback((rule:any, value:string, cb:any) => {
    if (!value) {
      cb('请输入用户名');
    } else {
      if (value.length < 5) cb('请输入正确的用户名');
      cb();
    }
  }, []);
  const verifyPassword:callbackType = useCallback((rule:any, value:string, cb:any) => {
    const reg = /^[0-9A-Za-z]{5,24}$/;
    if (!value) {
      cb('请输入密码');
    } else {
      if (!reg.test(value)) cb('密码必须是由数字+字母组成的5-24位字符');
      cb();
    }
  }, []);

  // 是否记住用户处理函数
  const whetherToRememberUser = (event: CheckboxChangeEvent) => {
    setRemember(event.target.checked);
  };

  return (
    <Form
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      name="login"
      initialValues={{ remember: true, username: 'admin', password: 'admin' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '' }, { validator: verifyUsername }]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '' }, { validator: verifyPassword }]}
      >
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 1, span: 23 }} name="remember" valuePropName="checked">
        <Checkbox
          checked={remember}
          onChange={(event) => whetherToRememberUser(event)}
        >
          记住我
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
        <Button type="primary" htmlType="submit" className="submit-login">
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(MForm);
