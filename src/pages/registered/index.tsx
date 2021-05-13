import React, { FC, ReactElement, memo } from 'react';
import { RegisteredWrapper } from './style';

const Registered: FC = (): ReactElement => (
  <RegisteredWrapper />
);

export default memo(Registered);
