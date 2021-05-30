import React, { FC, memo, ReactElement } from 'react';
import { Select } from 'antd';

interface IProps {
    data: any[]
    handleChange: (value: number) => void
    dataIndex: string
    dataKey:string
    handleSearch: (value: string) => void
    placeholder:string
}

const { Option } = Select;

const GSearch: FC<IProps> = (props: IProps): ReactElement => {
  const {
    data, handleChange, dataIndex, handleSearch, dataKey, placeholder,
  } = props;

  return (
    <Select
      style={{ width: 300 }}
      showSearch
      placeholder={placeholder}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      { data.map((item) => (
        <Option
          key={item[dataKey] + item[dataIndex]}
          value={item[dataKey]}
        >
          { item[dataIndex] }
        </Option>
      )) }
    </Select>
  );
};

export default memo(GSearch);
