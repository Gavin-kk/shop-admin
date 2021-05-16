import React, { FC, ReactElement, memo } from 'react';

const Bar: FC = (): ReactElement => (
  <><h2>Bar</h2></>
);

export default memo(Bar);
