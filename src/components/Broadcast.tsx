import React from 'react';
import { useSelector } from 'react-redux';
import Linkify from 'react-linkify';
import styled from 'styled-components';
import { RootStore } from 'store';

const StyledBroadcast = styled.div`
  display: flex;
  background: rgb(76, 175, 80);
  align-items: center;
  justify-content: center;
  font-weight: 600;
  padding: 10px;
  color: #fff;
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover {
    color: #fff;
  }
`;

const Broadcast: React.FC = () => {
  const settingsState = useSelector((state: RootStore) => state.settings);

  const componentDecorator = (href: any, text: any, key: any) => (
    <StyledLink href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </StyledLink>
  );

  return settingsState.broadcast?.show && settingsState.broadcast?.message ? (
    <StyledBroadcast>
      <span>
        <Linkify componentDecorator={componentDecorator}>{settingsState.broadcast.message}</Linkify>
      </span>
    </StyledBroadcast>
  ) : null;
};

export default Broadcast;
