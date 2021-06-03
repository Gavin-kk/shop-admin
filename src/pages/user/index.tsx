import React, {
  FC, memo, ReactElement, useCallback, useEffect, useState,
} from 'react';
import {
  Button, Card, Input, Popconfirm, Space, Table,
} from 'antd';
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import {
  deleteUserAction, getUserInfoAction, getUserListAction, searchForUsersAction,
} from '@pages/user/store/action-creators';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { momentConfig } from '@src/config/moment-config';
import GModal, { Method } from '@pages/user/components/g-modal';
import { IUserList } from './typing';

moment.locale('zh-cn', momentConfig);

const { Search } = Input;
const User: FC = (): ReactElement => {
  const { userList } = useSelector((state:IRootReducerStateType) => ({
    userList: state.user.userList,
  }), shallowEqual);
  // 添加组件是否显示
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // 修改"组件是否显示
  const [method, setMethod] = useState<Method>(Method.ADD);
  // 使用弹框的方法
  const dispatch = useDispatch();

  useEffect(() => {
    // 获取用户列表
    dispatch(getUserListAction);
  }, []);

  const handleSearch = useCallback((value: string) => {
    if (value) {
      dispatch(searchForUsersAction(value));
    } else {
      dispatch(getUserListAction);
    }
  }, [dispatch]);

  const columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
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
        const edit = () => {
          setMethod(Method.EDIT);
          dispatch(getUserInfoAction(rowData.id));
          setIsModalVisible(true);
        };
        const remove = () => {
          dispatch(deleteUserAction(rowData.id));
        };
        return (
          <>
            <Button type="primary" size="small" onClick={edit} style={{ marginRight: 8 }}>修改</Button>
            <Popconfirm
              title="你确定要删除吗"
              onConfirm={remove}
              okText="是"
              cancelText="否"
            >
              <Button type="dashed" size="small">删除</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // 控制添加或修改用户的表单控件为显示
  const showAddedUsers = useCallback(() => {
    setMethod(Method.ADD);
    setIsModalVisible(true);
  }, []);
  // 控制添加用户或修改的表单控件为隐藏
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
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="id"
      />
      <GModal
        method={method}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        changeIsModalVisible={changeIsModalVisible}
      />
    </Card>
  );
};

export default memo(User);
