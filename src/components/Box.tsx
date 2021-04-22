import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  color: #c0c0c2;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTitle = styled.div`
  min-width: 125px;

  & > span {
    color: #fff;
  }
`;

const Box: React.FC<{
  title?: string;
  body: string;
  className?: string;
}> = ({ title, body, ...rest }) => {
  return (
    <StyledBox>
      {title ? <StyledTitle>{title}</StyledTitle> : null}
      <span {...rest}>{body}</span>
    </StyledBox>
  );
};

export default Box;
