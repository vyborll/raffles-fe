import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import Components from '../components';
import { RootStore } from '../store';

const StyledLineContainer = styled.h1`
  margin: 40px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    background: #fff;
    height: 2px;
    flex: 1;
    content: '';
  }
`;

const StyledLineSpan = styled.span`
  background: transparent;
  margin: 0 15px;
`;

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeader = styled.div`
  font-weight: 400;
  font-size: 1.25rem;
`;

const StyledInfo = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`;

const Raffles: React.FC = () => {
  const rafflesState = useSelector((state: RootStore) => state.raffles);
  const settingsState = useSelector((state: RootStore) => state.settings);

  return (
    <>
      <Row className="mt-5 mb-5">
        <Col lg={6} className="mb-3">
          <Components.Card className="bg-success">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Users Registered</StyledHeader>
                <StyledInfo>{settingsState.totals.users.toLocaleString()}</StyledInfo>
              </div>
            </StyledCard>
          </Components.Card>
        </Col>
        <Col lg={6} className="mb-3">
          <Components.Card className="bg-danger">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faDollarSign} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Robux Won</StyledHeader>
                <StyledInfo>{settingsState.totals.paid.toLocaleString()}</StyledInfo>
              </div>
            </StyledCard>
          </Components.Card>
        </Col>
      </Row>

      <StyledLineContainer>
        <StyledLineSpan>Active Raffles</StyledLineSpan>
      </StyledLineContainer>
      <Row className="mt-5">
        {rafflesState.data?.map((raffle, index) => {
          if (raffle.status === 'ACTIVE') {
            return (
              <Col lg={4} key={index} className="mb-3">
                <Components.Raffle id={raffle._id} data={raffle} />
              </Col>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </>
  );
};

export default Raffles;
