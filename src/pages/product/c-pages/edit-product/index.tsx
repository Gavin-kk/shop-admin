import React, { FC, memo, ReactElement } from 'react';
import DetailsModification, { Method } from '@pages/product/components/details-modification';
import { useLocation } from 'react-router-dom';

const EditProduct: FC = (): ReactElement => {
  const location = useLocation<number>();
  const id:number = location.state;
  console.log(id);
  return (
    <DetailsModification method={Method.EDIT} editId={id} />
  );
};

export default memo(EditProduct);
