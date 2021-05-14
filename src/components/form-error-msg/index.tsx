import React, { FC, ReactElement, memo } from 'react';
import classNames from 'classnames';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormErrorMsgWrapper } from './style';

interface IProps {
    errMsg:string
    name?:string
}

const FormErrorMsg: FC<IProps> = (props:IProps): ReactElement => {
  const { errMsg, name } = props;

  return (
    <FormErrorMsgWrapper className={classNames([name, 'error-msg-box'])}>
      <InfoCircleOutlined />
      <span className="error-msg">{ errMsg }</span>
    </FormErrorMsgWrapper>
  );
};

FormErrorMsg.defaultProps = {
  name: '',
};

export default memo(FormErrorMsg);
