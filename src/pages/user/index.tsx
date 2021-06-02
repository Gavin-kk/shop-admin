import React, {
  FC, ReactElement, memo, useCallback, useEffect, useState,
} from 'react';
import {
  Button, Card, Form, Input, Modal, Space, Table,
} from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { getUserListAction } from '@pages/user/store/action-creators';
import { IRootReducerStateType, IUser } from '@src/common/types/sotre-types/reducer.interface';
import { momentConfig } from '@src/config/moment-config';
import GModal from '@pages/user/components/g-modal';
import { UserPageWrapper } from './style';
import { IUserList } from './typing';

moment.locale('zh-cn', momentConfig);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const { Search } = Input;
const User: FC = (): ReactElement => {
  const { userList } = useSelector((state:IRootReducerStateType) => ({
    userList: state.user.userList,
  }), shallowEqual);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 获取用户列表
    dispatch(getUserListAction);
  }, []);

  const handleSearch = useCallback((value: string) => {
    console.log(value);
  }, [dispatch]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '手机',
      render(rowData: IUserList) {
        return (<span>{rowData.phone ? rowData.phone : '空'}</span>);
      },
    },
    {
      title: '邮箱',
      render(rowData: IUserList) {
        return (<span>{rowData.email ? rowData.email : '空'}</span>);
      },
    },
    {
      title: '角色名称',
      render(rowData: IUserList) {
        return (<span>{rowData.role_name ? rowData.role_name : '空'}</span>);
      },
    },
    {
      title: '创建时间',
      render(rowData: IUserList) {
        return (
          <span>
            {
            rowData.createAt
              ? moment(moment(rowData.createAt).valueOf() - (1000 * 60 * 60 * 8)).format('llll')
              : '空'
            }
          </span>
        );
      },
    },
    {
      title: '更新时间',
      render(rowData: IUserList) {
        return (
          <span>
            { rowData.updateAt
              ? moment(moment(rowData.updateAt).valueOf() - (1000 * 60 * 60 * 8)).format('llll')
              : '空'}
          </span>
        );
      },
    },
    {
      title: '操作',
      render(rowData: IUserList) {
        return (
          <>
            <Button type="primary" size="small">修改</Button>
            <Button type="dashed" size="small">删除</Button>
          </>
        );
      },
    },
  ];

  // 控制添加用户的表单控件为显示
  const showAddedUsers = useCallback(() => {
    setIsModalVisible(true);
  }, []);
  // 控制添加用户的表单控件为隐藏
  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const changeIsModalVisible = useCallback((show:boolean) => {
    setIsModalVisible(show);
  }, []);

  return (
    <Card
      title={(
        <Space direction="vertical">
          <Search
            enterButton
            style={{ width: 400 }}
            placeholder="请输入用户名"
            onSearch={handleSearch}
          />
        </Space>
      )}
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={showAddedUsers}>添加用户</Button>}
      style={{ width: '100%' }}
    >
      {/* /!* <UserPageWrapper /> *!/columns={columns} */}
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="id"
      />
      <GModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        changeIsModalVisible={changeIsModalVisible}
      />
    </Card>
  );
};

export default memo(User);
