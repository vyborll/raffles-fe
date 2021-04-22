import React from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
  color: #fff;
  background-color: transparent;
  border-radius: 2px;
  border: 2px solid #33363a;
  padding: 0.75rem 1rem;
  border-color: #33363a;

  &:focus {
    background-color: transparent;
    color: #fff;
    outline: none 0 !important;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }

  &:disabled {
    background-color: transparent;
  }

  &:read-only {
    background-color: transparent;
  }

  &::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

const Input: React.FC<{
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  pattern?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  return <StyledFormControl {...props} autoComplete="off" />;
};

export default Input;
