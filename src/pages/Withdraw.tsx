import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import Components from '../components';
import Card from '../components/Card';
import Input from '../components/Input';
import { RootStore } from 'store';
import MySwal from 'utils/swal';
import { withdrawIntent } from 'store/users/actions';

const StyledInputTitle = styled.span`
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledInputPrepend = styled.span`
  background-color: #33393f;
  border: none;
  color: #fff;
`;

const StyledGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledGroupDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Withdraw: React.FC = () => {
  const dispatch = useDispatch();

  const usersState = useSelector((state: RootStore) => state.users);
  const withdrawsState = useSelector((state: RootStore) => state.withdraws);

  const [withdraw, setWithdraw] = useState<{ username: string; robux: string }>({
    username: '',
    robux: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'robux') {
      if (e.target.validity.valid) {
        setWithdraw({ ...withdraw, robux: e.target.value });
      } else if (e.target.value === '' || e.target.value === '-') {
        setWithdraw({ ...withdraw, robux: e.target.value });
      }
    } else {
      setWithdraw({ ...withdraw, [e.target.name]: e.target.value });
    }
  };

  const handleClick = () => {
    if (!withdraw.username || !withdraw.robux) {
      return MySwal.fire({
        icon: 'error',
        title: '<h1 class="text-white">Error</h1>',
        html: '<p class="text-white">You did not enter a valid username or robux amount</p>',
      });
    }

    if (usersState.user.balance < parseInt(withdraw.robux)) {
      return MySwal.fire({
        icon: 'error',
        title: '<h1 class="text-white">Error</h1>',
        html: '<p class="text-white">You do not have enough balance to withdraw that much</p>',
      });
    }

    MySwal.fire({
      icon: 'warning',
      title: '<h1 class="text-white">Warning</h1>',
      html: `<p class="text-white">You are sending <span class="text-warning">R$ ${withdraw.robux}</span> to <span class="text-warning">${withdraw.username}</span></p>`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-success mr-3',
      },
    }).then((result) => {
      if (result.value) {
        dispatch(withdrawIntent(withdraw.username, parseInt(withdraw.robux)));
      }
    });
  };

  return (
    <>
      <Row className="mt-5">
        <Col sm={12} md={6} lg={6} className="mb-4">
          <Card>
            <h3 className="mb-4 text-center text-white">Withdraw</h3>
            <Row>
              <Col sm={12} lg={6}>
                <StyledInputTitle>Username</StyledInputTitle>
                <div className="input-group mb-sm-4">
                  <Input
                    onChange={(e) => onChange(e)}
                    type="text"
                    name="username"
                    value={withdraw.username}
                    placeholder="Username"
                  />
                </div>
              </Col>
              <Col sm={12} lg={6}>
                <StyledInputTitle>You will receive</StyledInputTitle>
                <div className="input-group mb-sm-4">
                  <div className="input-group-prepend">
                    <StyledInputPrepend className="input-group-text">R$</StyledInputPrepend>
                  </div>
                  <Input
                    onChange={(e) => onChange(e)}
                    type="tel"
                    name="robux"
                    placeholder="0"
                    value={withdraw.robux}
                    pattern="^-?[0-9]\d*\.?\d*$"
                  />
                </div>
              </Col>
              <Col lg={12} className="text-center">
                <Components.Button onClick={handleClick} className="btn">
                  Withdraw
                </Components.Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={6} className="mb-4">
          <Card className="h-100">
            <h3 className="mb-4 text-center text-white">Group</h3>
            <StyledGroupContainer>
              <StyledGroupDiv>
                <p>Status:</p>
                <span className={withdrawsState.group.id ? 'text-success' : 'text-danger'}>
                  {withdrawsState.group.id ? 'In Stock' : 'Restocking...'}
                </span>
              </StyledGroupDiv>
              <StyledGroupDiv>
                {withdrawsState.group.id ? (
                  <a
                    target="_blank"
                    href={`https://www.roblox.com/groups/${withdrawsState.group.id}`}
                    rel="noreferrer"
                    className="btn btn-info"
                  >
                    Join Group
                  </a>
                ) : (
                  <a target="_blank" href="/" rel="noreferrer" className="btn btn-info disabled">
                    Join Group
                  </a>
                )}
              </StyledGroupDiv>
            </StyledGroupContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Withdraw;
