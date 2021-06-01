import { Cascader } from 'antd';
import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';
import { getCategoryRequest, getParentCategoryRequest } from '@src/services/product-request';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import { changeCurrentSelectedAction } from '../../store/action-creators';
import { IClassify } from '../../typing';

interface IProps {
  placeholder?:string[]
}

const CascadeSelection: FC<IProps> = ({ placeholder }): ReactElement => {
  const [options, setOptions] = useState<CascaderOptionType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // 先获取父分类的所有数据
    getListOfParentCategories();
  }, []);

  // 级联选择器变化时触发
  const onChange = (value:CascaderValueType) => {
    dispatch(changeCurrentSelectedAction((value as number[])[value.length - 1]));
  };
  // 获取0级分类
  const getListOfParentCategories = async () => {
    // 获取数据
    const response:AxiosResponse<IResponse<IClassify[]>> = await getParentCategoryRequest();
    setOptions(handleData(response.data.data));
  };
  // 根据id请求对应的分类数据
  const getCategory = async (id:number):Promise<CascaderOptionType[]> => {
    const response:AxiosResponse<IResponse<IClassify[]>> = await getCategoryRequest(id);
    return handleData(response.data.data);
  };

  const loadData = async (selectedOptions?:CascaderOptionType[]) => {
    if (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      const result = await getCategory((targetOption.value as number));
      if (!result.length) {
        targetOption.isLeaf = true;
        targetOption.loading = false;
        setOptions([...options]);
      } else {
        targetOption.children = result;
        targetOption.loading = false;
      }
      setOptions([...options]);
    }
  };

  const handleData = (classifyList:IClassify[]):CascaderOptionType[] => classifyList.map((item:IClassify) => ({
    value: item.id,
    label: item.categoryName,
    isLeaf: false,
  }));

  const handlePlaceholder = ():string | null => {
    let str = '';
    if (placeholder) {
      placeholder.forEach((item, index) => {
        if (index === placeholder.length - 1) {
          str += item;
        } else {
          str += `${item} / `;
        }
      });
      return str;
    }
    return null;
  };

  return (
    <Cascader
      options={options}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect
      placeholder={handlePlaceholder() || '请选择分类'}
    />
  );
};

export default memo(CascadeSelection);
