import styled from 'styled-components';

export const FormErrorMsgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 45px;
    transform: translateX(-50%);
    color: red;
    height: 16px;

    .error-msg {
      margin-left: 5px;
    }

    .anticon {
      transform: rotate(180deg);
    }
`;
