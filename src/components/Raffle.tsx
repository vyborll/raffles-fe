import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';

import * as types from '../store/raffles/types';

import Card from './Card';
import Countdown from './Countdown';

const StyledRaffleTop = styled.div`
  display: flex;
`;

const StyledHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  &:first-child {
    justify-content: start;
  }

  &:last-child {
    justify-content: flex-end;
  }
`;

const StyledLink = styled(Link)`
  background-color: #5d5dff;
  color: #fff;
  border-radius: 2px;

  &:hover {
    background-color: #4b4acf;
    color: #fff;
  }
`;

const StyledRaffleTitle = styled.h3`
  font-weigh: 600;
  font-size: 1.8rem;
`;

const StyledRafflePrize = styled.h4`
  font-weight: 600;
  font-size: 1.6rem;
  color: rgba(52, 211, 153);
`;

const StyledRaffleWinners = styled.h5`
  font-weight: 500;
  font-size: 1.5rem;
`;

const Raffle: React.FC<{
  id?: string;
  data: types.IRaffle;
}> = ({ id, data }) => {
  return (
    <>
      <Card>
        <StyledRaffleTop>
          <StyledHeader>
            <FontAwesomeIcon className="mr-2" icon={farClock} size="1x" />
            <Countdown time={data.end_at} />
          </StyledHeader>
          <StyledHeader>
            <FontAwesomeIcon className="mr-2" icon={faUsers} size="1x" />
            <span>
              {data.users_entered} / {data.max_entries}
            </span>
          </StyledHeader>
        </StyledRaffleTop>
        <div className="text-center mt-4 mb-4">
          <StyledRaffleTitle>{data.name}</StyledRaffleTitle>
          <StyledRafflePrize>R$ {data.reward}</StyledRafflePrize>
          <img className="mt-4 mb-4" src={data.image} alt={data.name} width="150" />
          <StyledRaffleWinners>
            {data.max_winners > 1 ? `${data.max_winners} Winners` : '1 Winner'}
          </StyledRaffleWinners>
        </div>
        <StyledLink to={`/raffle/${id}`} className="btn btn-block">
          Enter Raffle
        </StyledLink>
      </Card>
    </>
  );
};

export default Raffle;
