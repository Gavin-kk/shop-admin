import {
  Input, Modal, Tree, Form,
} from 'antd';
import React, {
  memo, FC, useState, ChangeEvent, useEffect,
} from 'react';
import { InputWrapper, TreeWrapper } from '@pages/role/components/modal/style';
import adminPageMenuConfig from '@src/config/admin-page-menu-config';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { addRoleAction } from '../../store/action-creators';

interface IProps {
  isModalVisible: boolean
  onCancel: () => void
  controlDisplay:(show:boolean)=>void
  method:Method
}

export type AddRoleType = {
  roleName:string
  menus:string[]
  authTime?:string
}

export enum Method {
  ADD,
  EDIT,
  LOOK
}

const { Item } = Form;
const GModal: FC<IProps> = ({
  isModalVisible,
  onCancel,
  controlDisplay,
  method,
}) => {
  const { info } = useSelector((state:IRootReducerStateType) => ({
    info: state.role.info,
  }), shallowEqual);
  // 表单验证状态
  const [verificationStatus, setVerificationStatus] = useState<ValidateStatus>('success');
  const [help, setHelp] = useState<string | null>(null);
  // 当前input输入的值
  const [roleNameInputValue, setRoleNameInputValue] = useState<string>('');
  // 当前树形控件选择的值
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  // 默认选中的key
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (method === Method.EDIT && info) {
      setRoleNameInputValue(info.roleName);
      console.log(info.menu);
      setCurrentSelected(info.menu);
    } else if (method === Method.ADD) {
      setCurrentSelected([]);
      setRoleNameInputValue('');
      // setDefaultCheckedKeys([]);
    }
  }, [method, info]);
  // input输入改变时触发的函数
  const inputChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      setVerificationStatus('success');
      setHelp(null);
    }
    setRoleNameInputValue(event.target.value);
  };

  // 对话框点击ok执行的函数
  const handleOk = () => {
    const addRoleInfo:AddRoleType = {
      roleName: (roleNameInputValue as string),
      menus: currentSelected,
    };

    if (!roleNameInputValue) {
      setVerificationStatus('error');
      setHelp('角色名称不可为空');
    } else {
      dispatch(addRoleAction(addRoleInfo));
      controlDisplay(false);
    }
  };

  /*  const onSelect = (selectedKeys: Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  }; */

  // 每次选择树形结构框 执行的函数
  const onCheck = (checkedKeys: string[]) => {
    setCurrentSelected(checkedKeys);
  };

  const handleMentConfig = [{ title: '权限列表', key: '权限列表', children: adminPageMenuConfig }];

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={onCancel}>
      <InputWrapper>
        <span>角色名称</span>
        <Item
          validateStatus={verificationStatus}
          help={help}
          style={{ display: 'inline-block', marginLeft: 8, width: 400 }}
        >
          <Input
            disabled={method !== Method.ADD}
            value={roleNameInputValue}
            onChange={inputChange}
            placeholder="请输入角色名称"
          />
        </Item>
      </InputWrapper>

      {/*  树型控件 */}
      <TreeWrapper>
        <span>
          权限列表
        </span>
        <Tree
          defaultExpandAll
          checkable
          // selectedKeys={currentSelected}
          checkedKeys={currentSelected}
          // defaultExpandedKeys={['0-0-0', '0-0-1']}
          // defaultSelectedKeys={defaultCheckedKeys}
          // defaultCheckedKeys={}
          onCheck={(onCheck as (checked:any, info: any) => void)}
          treeData={handleMentConfig}
        />
      </TreeWrapper>
    </Modal>
  );
};

export default memo(GModal);
