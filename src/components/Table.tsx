import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import styled from 'styled-components';

import * as types from '../store/users/types';

export interface IEntries {
  name: string;
  date: string;
}

const StyledTable = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overscroll-behavior: none;
`;

const StyledHeader = styled.div`
  display: flex;

  & > div {
    flex: 1;
    text-transform: uppercase;
    padding-left: 10px;
  }
`;

const StyledBody = styled.div<{
  height: 'default' | 'entries';
}>`
  overflow: auto;
  height: ${(p) => (p.height === 'default' ? 'calc(55vh)' : '100%')};
`;

const StyledTd = styled.div`
  display: flex;
  align-items: center;

  & > div {
    flex: 1;
    padding: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Table: React.FC<{
  type: 'history' | 'entries';
  height?: 'default' | 'entries';
  headers?: string[];
  data: types.IHistory[] | IEntries[];
  message: string;
}> = ({ type, height = 'default', headers, data, message }) => {
  return (
    <StyledTable>
      {headers ? (
        <StyledHeader>
          {headers.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </StyledHeader>
      ) : null}
      <StyledBody height={height}>
        {!data || data.length < 1 ? (
          <StyledNone>{message}</StyledNone>
        ) : type === 'history' ? (
          (data as any[]).map((item: types.IHistory, index) => (
            <StyledTd key={index}>
              <div className="text-capitalize">{item.type}</div>
              <div>{item.name}</div>
              <div className="text-capitalize">
                {item.status === 'COMPLETED' ? 'Completed' : item.status}
              </div>
              <div>{moment(item.createdAt).format('L')}</div>
            </StyledTd>
          ))
        ) : type === 'entries' ? (
          (data as any[]).map((item: IEntries, index) => (
            <StyledTd key={index}>
              <div>{item.name}</div>
              <div>+1 Entry</div>
              <Moment element="div" fromNow>
                {moment(item.date)}
              </Moment>
            </StyledTd>
          ))
        ) : null}
      </StyledBody>
    </StyledTable>
  );
};

export default Table;
