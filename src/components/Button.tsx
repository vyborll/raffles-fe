import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #5d5dff;
  color: #fff;
  border-radius: 2px;

  &:hover {
    background-color: #4b4acf;
    color: #fff;
  }
`;

const Button: React.FC<{
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement[] | ReactElement | string;
}> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
