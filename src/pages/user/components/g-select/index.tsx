import React, {
  memo, FC, Fragment, useEffect,
} from 'react';
import { Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { IActionType } from '@src/common/types/sotre-types/action-type';

interface IProps {
  data:any[]
  keys:string
  displayName:string
  action:(id:number | null)=>IActionType
}
const { Option } = Select;

const GSelect: FC<IProps> = ({
  data,
  keys,
  displayName,
  action,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action(data[0][keys]));
  }, []);

  const selectChange = (value:number) => {
    dispatch(action(value));
  };
  return (
    <Select defaultValue={data[0][displayName]} style={{ width: 470 }} onChange={selectChange}>
      {data.map((item) => (
        <Fragment key={item[keys]}>
          <Option value={item[keys]}>{item[displayName]}</Option>
        </Fragment>
      ))}
    </Select>
  );
};

export default memo(GSelect);
