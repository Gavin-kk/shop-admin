import React, {
  FC, Key, memo, ReactElement, useCallback, useEffect, useState,
} from 'react';
import {
  Button, Card, Input, Popconfirm, Space, Table,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  changeCurrentInfoAction, deleteRoleAction, getRoleListAction, searchRoleAction,
} from '@pages/role/store/action-creators';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { ColumnsType } from 'antd/lib/table/interface';
import { IRoleList } from '@pages/role/typing';
import GModal, { Method } from '@pages/role/components/modal';

const { Search } = Input;

const Role: FC = (): ReactElement => {
  const { roleList, info } = useSelector((state:IRootReducerStateType) => ({
    roleList: state.role.roleList,
    info: state.role.info,
  }), shallowEqual);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // 控制时修改还是删除
  const [method, setMethod] = useState<Method>(Method.ADD);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleListAction);
  }, []);

  // 搜索
  const handleSearch = useCallback((value: string) => {
    if (value) {
      dispatch(searchRoleAction(value));
    } else {
      dispatch(getRoleListAction);
    }
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
      width: 200,
      render(rowDate:IRoleList) {
        const confirm = () => {
          dispatch(deleteRoleAction(rowDate.id));
        };
        return (
          <Popconfirm
            title="删除后无法恢复,你确定吗?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>删除</Button>
          </Popconfirm>
        );
      },
    },
  ];
  // 对话框关闭时执行
  const onCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  // 自组件控制对话框是否显示的回掉函数
  const controlDisplay = useCallback((show:boolean) => {
    setIsModalVisible(show);
  }, []);

  const showDialog = useCallback(() => {
    setIsModalVisible(true);
    // 修改组件状态为 add
    setMethod(Method.ADD);
  }, []);
  // 设置角色权限
  const setRolePermissions = () => {
    // 修改组件状态为 edit
    setMethod(() => Method.EDIT);

    // 让对话框显示
    setIsModalVisible(true);
  };
  return (
    <Card
      title={(
        <Space direction="vertical">
          <Search
            enterButton
            style={{ width: 400 }}
            placeholder="请输入角色名称或授权人"
            onSearch={handleSearch}
          />
        </Space>
      )}
      extra={(
        <>
          <Button style={{ marginRight: 8 }} disabled={!info} onClick={setRolePermissions}>设置角色权限</Button>
          <Button type="primary" onClick={showDialog}>添加角色</Button>
        </>
      )}
    >
      <Table
        rowSelection={{
          type: 'radio',
          onChange(currentSelected:Key[], rowData:IRoleList[]) {
            dispatch(changeCurrentInfoAction(rowData[0]));
          },
        }}
        columns={columns}
        dataSource={roleList}
        rowKey="id"
      />
      <GModal
        method={method}
        isModalVisible={isModalVisible}
        onCancel={onCancel}
        controlDisplay={controlDisplay}
      />
    </Card>
  );
};

export default memo(Role);
