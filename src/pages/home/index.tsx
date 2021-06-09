import React, {
  FC, ReactElement, memo, useState, useEffect, useRef,
} from 'react';
import {
  Form,
  Input,
  Card,
  Upload, Button,
} from 'antd';
import { useHover } from 'ahooks';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { BASEURL } from '@src/services/config';
import classNames from 'classnames';
import { HomeWrapper, PersonalSettingsWrapper, SubmitWrapper } from './style';
import { updateUserInfoAction } from '../user/store/action-creators';

const { useForm } = Form;

const Home: FC = (): ReactElement => {
  const { userInfo } = useSelector((state:IRootReducerStateType) => ({
    userInfo: state.auth.userInfo,
  }), shallowEqual);

  const [loading, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [form] = useForm();
  const dispatch = useDispatch();
  const uploadRef = useRef<HTMLDivElement>(null);
  // 判断ref元素是否 鼠标移入
  const isHover: boolean = useHover(uploadRef);

  useEffect(() => {
    if (userInfo) {
      setImgUrl(userInfo?.avatar as string);
      form.setFieldsValue({
        email: userInfo?.email,
        phone: userInfo?.phone,
        username: userInfo?.username,
      });
    }
  }, [userInfo]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info:UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImgUrl(info.file?.response?.data.urls[0]);
    }
  };

  const onFinish = (values:any) => {
    const submitData = {
      id: userInfo?.id,
      avatar: imgUrl,
      ...values,
    };
    dispatch(updateUserInfoAction(submitData));
  };

  return (
    <HomeWrapper>
      <Card
        title="个人中心"
        style={{
          width: '100%',
        }}
      >
        <PersonalSettingsWrapper>
          <div ref={uploadRef} className="upload-box">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${BASEURL}/upload/avatar`}
              onChange={handleChange}
            >
              {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
              <div className={classNames({ show: isHover }, 'mask')}>更改头像</div>
            </Upload>
          </div>
        </PersonalSettingsWrapper>

        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          style={{ marginTop: 15 }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            label="名称"
            name="username"
            rules={[{ required: true, message: '这是必须的' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email" rules={[{ required: false, message: '' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="电话" name="phone" rules={[{ required: false, message: '' }]}>
            <Input />
          </Form.Item>

          <SubmitWrapper>
            <Button type="primary" htmlType="submit" style={{ width: 200, marginLeft: 30 }}>
              更新信息
            </Button>
          </SubmitWrapper>
        </Form>
      </Card>
    </HomeWrapper>
  );
};

export default memo(Home);
