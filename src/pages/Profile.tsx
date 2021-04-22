import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import styled from 'styled-components';

import { RootStore } from '../store';
import { getHistory } from '../store/users/actions';

import Card from '../components/Card';
import Box from '../components/Box';
import Table from '../components/Table';

const StyledAvatarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const StyledContact = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const users = useSelector((store: RootStore) => store.users);

  return (
    <>
      <Row className="mt-5">
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <h4 className="mb-4">Profile</h4>
            <StyledAvatarDiv>
              <StyledAvatar className="mr-4" src={users.user.avatar} alt="Avatar" />
            </StyledAvatarDiv>
            <Box title="Total Won:" body={`R$ ${users.user.earned}`} className="text-white" />
            <Box
              title="Register Date:"
              body={moment(users.user.createdAt).format('ll')}
              className="text-white"
            />
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <h4 className="mb-4">Contact</h4>
            <StyledContact />
            <Box
              title="Email:"
              body={`${users.user.email.substring(0, 3)}***@${users.user.email.substring(
                users.user.email.lastIndexOf('@') + 1,
              )}`}
              className="text-white"
            />
            <Box title="Discord:" body="-" className="text-white" />
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col sm={12}>
          <Card>
            <h4 className="mb-4" style={{ paddingLeft: '10px' }}>
              History
            </h4>
            <Table
              type="history"
              headers={['Type', 'Name', 'Status', 'Date']}
              data={users.history}
              message="No History Found"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
