import React, {
  FC, ReactElement, memo, useCallback, useEffect,
} from 'react';
import {
  Button, Card, Input, Popconfirm, Space, Table,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getRoleListAction } from '@pages/role/store/action-creators';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { ColumnsType } from 'antd/lib/table/interface';
import { IRoleList } from '@pages/role/typing';

const { Search } = Input;

const Role: FC = (): ReactElement => {
  const { roleList } = useSelector((state:IRootReducerStateType) => ({
    roleList: state.role.roleList,
  }), shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoleListAction);
  }, []);

  // 搜索
  const handleSearch = useCallback((value: string) => {
    console.log(value);
  }, []);
  const columns: ColumnsType<IRoleList> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '授权时间',
      dataIndex: 'authTime',
    },
    {
      title: '授权人',
      dataIndex: 'authName',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
    {
      title: '操作',
      width: 300,
      render() {
        return (
          <>
            <Button type="primary" size="small" style={{ marginRight: 8 }}>查看</Button>
            <Button type="primary" size="small" danger>删除</Button>
          </>
        );
      },
    },
  ];

  return (
    <Card
      title={(
        <Space direction="vertical">
          <Search
            enterButton
            style={{ width: 400 }}
            placeholder="请输入角色名称"
            onSearch={handleSearch}
          />
        </Space>
      )}
      extra={(
        <>
          <Button style={{ marginRight: 8 }}>设置角色权限</Button>
          <Button type="primary">添加角色</Button>
        </>
      )}
    >
      <Table
        columns={columns}
        dataSource={roleList}
        rowKey="id"
      />

    </Card>
  );
};

export default memo(Role);
