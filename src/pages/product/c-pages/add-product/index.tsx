import React, {
  FC, ReactElement, memo,
} from 'react';

import DetailsModification, { Method } from '@pages/product/components/details-modification';

const AddProduct: FC = (): ReactElement => (
  <DetailsModification method={Method.ADD} />
);

export default memo(AddProduct);
