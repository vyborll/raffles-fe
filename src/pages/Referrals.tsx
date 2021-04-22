import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import Button from '../components/Button';
import Card from '../components/Card';
import { RootStore } from 'store';

const StyledRefContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > input {
    margin-right: 10px;
  }
`;

const StyledInput = styled(FormControl)`
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

  &:read-only {
    background-color: transparent;
  }

  &::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

const Referrals: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const usersState = useSelector((state: RootStore) => state.users);

  const copyToClipboard = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <>
      <Row className="mt-5 mb-5">
        <Col>
          <Card>
            <h1 className="text-center mb-4">Referrals</h1>
            <Row>
              <Col sm={12} lg={{ span: '8', offset: '2' }}>
                <StyledRefContainer className="mb-4">
                  <StyledInput
                    type="text"
                    ref={inputRef}
                    value={`https://rbxraffles.com/?ref=${usersState.user.googleId}`}
                    readOnly={true}
                  />
                  <Button onClick={copyToClipboard} type="button" className="btn">
                    Copy
                  </Button>
                </StyledRefContainer>
                <div className="text-center">
                  <p>
                    If someone signs up using your link and wins a raffle then you will receive 10%
                    of the reward that they have won each time.
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={12} lg={6} className="mb-4 text-center">
          <Card>
            <h3>
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Users Referred
            </h3>
            <h4>{usersState.user.ref.total}</h4>
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-4 text-center">
          <Card>
            <h3>
              <FontAwesomeIcon icon={faDollarSign} className="mr-3" />
              R$ Earned
            </h3>
            <h4>{usersState.user.ref.earned}</h4>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Referrals;
