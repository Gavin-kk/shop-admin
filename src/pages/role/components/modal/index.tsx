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
import { addRoleAction, updateRoleAction } from '../../store/action-creators';
import { RoleType } from '../../typing';

interface IProps {
  isModalVisible: boolean
  onCancel: () => void
  controlDisplay:(show:boolean)=>void
  method:Method
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
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (method === Method.EDIT && info) {
      /*  在菜单列表回显时
            因为menu中存储的是所有选中的菜单和父节点菜单
            所以在给tree控件做回显的时候 会出现一个情况
            就是只要父节点出现了 那么就会把所有子节点全部选中
          解决方案: 通过 tree控件的 onCheck:(value,event)=>void 的第二个参数中的 halfCheckedKeys 得到所有半选中的菜单
                  然后在数据库中设置一个 parentMenu 字段 存储所有父节点的 key 在我们添加时 就把所有父节点提交上去存储
                  当我们做回显时 通过这个 parentMenu 过滤掉menu中父节点的值 就大功告成了
      */
      // 去除父节点的当前选择
      const Selected = info.menu.filter((item) => info.parentMenu.findIndex((itemx) => itemx === item) === -1);
      setRoleNameInputValue(info.roleName);
      setCurrentSelected(Selected);
    } else if (method === Method.ADD) {
      setCurrentSelected([]);
      setRoleNameInputValue('');
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
    const menu = [...currentSelected];
    halfCheckedKeys.forEach((item) => {
      menu.push(item);
    });

    const RoleInfo:RoleType = {
      roleName: (roleNameInputValue as string),
      parentMenu: halfCheckedKeys,
      menu,
    };

    if (!roleNameInputValue) {
      setVerificationStatus('error');
      setHelp('角色名称不可为空');
    } else {
      if (method === Method.EDIT) {
        RoleInfo.id = info?.id;
        dispatch(updateRoleAction(RoleInfo));
      } else {
        dispatch(addRoleAction(RoleInfo));
      }
      controlDisplay(false);
    }
  };

  /*  const onSelect = (selectedKeys: Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  }; */

  // 每次选择树形结构框 执行的函数
  const onCheck = (checkedKeys: string[], e:any) => {
    setCurrentSelected(checkedKeys);
    setHalfCheckedKeys(e.halfCheckedKeys);
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
          checkedKeys={currentSelected}
          onCheck={(onCheck as (checked:any, info: any) => void)}
          treeData={handleMentConfig}
        />
      </TreeWrapper>
    </Modal>
  );
};

export default memo(GModal);
