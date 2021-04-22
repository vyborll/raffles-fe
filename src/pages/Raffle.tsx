import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import * as types from '../store/raffles/types';
import MySwal from '../utils/swal';

import Button from '../components/Button';
import Card from '../components/Card';
import Countdown from '../components/Countdown';
import Table from '../components/Table';
import { RootStore } from 'store';

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

const StyledRaffleTop = styled.div`
  display: flex;
`;

const StyledRaffleHeader = styled.div`
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

const StyledRaffleTitle = styled.h3`
  font-weight: 600;
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
  history: any;
  match: any;
}> = ({ history, match }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const [r, setR] = useState<types.IRaffle>({
    entries: [],
    winners: [],
    _id: '',
    name: '',
    reward: 0,
    value: '',
    status: '',
    image: '',
    createdAt: '',
    max_winners: 0,
    max_entries: 0,
    end_at: 0,
    users_entered: 0,
    latest_entries: [],
  });

  const raffleState = useSelector((state: RootStore) => state.raffles);
  const raffle = raffleState.data.find((x) => x._id === match.params.id);

  useEffect(() => {
    async function check() {
      try {
        if (!raffle) {
          const response = await axios.get(`/api/raffles/${match.params.id}/get`);
          setR({ ...response.data });
          setLoading(false);
        }
      } catch (err) {
        MySwal.fire({
          icon: 'error',
          title: '<h1 class="text-white mb-0">Error</h1>',
          html: '<p class="text-white">Could not find Raffle!</p>',
        });

        history.push('/raffles');
      }
    }

    check();
  }, [dispatch, match, history, raffle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      return MySwal.fire({
        icon: 'error',
        title: '<h1 class="text-white mb-0">Error</h1>',
        html: '<p class="text-white">Please fill out the captcha before trying to enter</p>',
      });
    }

    axios
      .post('/api/raffles/enter', {
        id: raffle?._id,
        'h-captcha-response': token,
      })
      .then((response) => {
        return MySwal.fire({
          icon: 'success',
          title: '<h1 class="text-white mb-0">Success</h1>',
          html: `<p class="text-white">${response.data.message}</p>`,
        });
      })
      .catch((error) => {
        return MySwal.fire({
          icon: 'error',
          title: '<h1 class="text-white mb-0">Error</h1>',
          html: `<p class="text-white">${
            error.response?.data?.message || 'Check your connection and try again'
          }</p>`,
        });
      });
  };

  return raffle ? (
    <>
      <Row className="mt-5">
        <Col lg={6}>
          <Card className="bg-success">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Winner</StyledHeader>
                <StyledInfo>-</StyledInfo>
              </div>
            </StyledCard>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="bg-danger">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faDollarSign} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Value</StyledHeader>
                <StyledInfo>R$ {raffle.reward * raffle.max_winners}</StyledInfo>
              </div>
            </StyledCard>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={6}>
          <Card>
            <StyledRaffleTop>
              <StyledRaffleHeader>
                <FontAwesomeIcon className="mr-2" icon={farClock} size="1x" />
                <Countdown time={raffle.end_at} />
              </StyledRaffleHeader>
              <StyledRaffleHeader>
                Status:{' '}
                <span
                  className={`ml-2 badge badge-pill ${
                    raffle.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'
                  }`}
                >
                  {raffle.status === 'ACTIVE' ? 'Active' : 'Ended'}
                </span>
              </StyledRaffleHeader>
              <StyledRaffleHeader>
                <FontAwesomeIcon className="mr-2" icon={faUsers} size="1x" />
                <span>
                  {raffle.users_entered} / {raffle.max_entries}
                </span>
              </StyledRaffleHeader>
            </StyledRaffleTop>
            <div className="text-center mt-4 mb-4">
              <StyledRaffleTitle className="text-white">{raffle.name}</StyledRaffleTitle>
              <StyledRafflePrize>R$ {raffle.reward}</StyledRafflePrize>
              <img className="mt-4 mb-4" src={raffle.image} alt={raffle.name} width="150" />
              <StyledRaffleWinners>
                {raffle.max_winners > 1 ? `${raffle.max_winners} Winners` : '1 Winner'}
              </StyledRaffleWinners>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="text-center mt-3 mb-3">
                <HCaptcha
                  sitekey="10000000-ffff-ffff-ffff-000000000001"
                  onVerify={(token) => setToken(token)}
                />
              </div>
              <Button type="submit" className="btn btn-block">
                Enter Raffle
              </Button>
            </form>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <Table
              type="entries"
              height="entries"
              headers={['Name', 'Type', 'Date']}
              data={raffle.latest_entries}
              message="No Entries"
            />
          </Card>
        </Col>
      </Row>
    </>
  ) : r && !loading ? (
    <>
      <Row className="mt-5">
        <Col lg={6}>
          <Card className="bg-success">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Winner</StyledHeader>
                <StyledInfo>-</StyledInfo>
              </div>
            </StyledCard>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="bg-danger">
            <StyledCard>
              <div>
                <FontAwesomeIcon icon={faDollarSign} size="3x" />
              </div>
              <div className="text-right">
                <StyledHeader>Value</StyledHeader>
                <StyledInfo>R$ {r.reward * r.max_winners}</StyledInfo>
              </div>
            </StyledCard>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={6}>
          <Card>
            <StyledRaffleTop>
              <StyledRaffleHeader>
                <FontAwesomeIcon className="mr-2" icon={farClock} size="1x" />
                <Countdown time={r.end_at} />
              </StyledRaffleHeader>
              <StyledRaffleHeader>
                Status:{' '}
                <span
                  className={`ml-2 badge badge-pill ${
                    r.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'
                  }`}
                >
                  {r.status === 'ACTIVE' ? 'Active' : 'Ended'}
                </span>
              </StyledRaffleHeader>
              <StyledRaffleHeader>
                <FontAwesomeIcon className="mr-2" icon={faUsers} size="1x" />
                <span>
                  {r.users_entered} / {r.max_entries}
                </span>
              </StyledRaffleHeader>
            </StyledRaffleTop>
            <div className="text-center mt-4 mb-4">
              <StyledRaffleTitle className="text-white">{r.name}</StyledRaffleTitle>
              <StyledRafflePrize>R$ {r.reward}</StyledRafflePrize>
              <img className="mt-4 mb-4" src={r.image} alt={r.name} width="150" />
              <StyledRaffleWinners>
                {r.max_winners > 1 ? `${r.max_winners} Winners` : '1 Winner'}
              </StyledRaffleWinners>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="text-center mt-3 mb-3">
                <HCaptcha
                  sitekey="10000000-ffff-ffff-ffff-000000000001"
                  onVerify={(token) => setToken(token)}
                />
              </div>
              <Button type="submit" className="btn btn-block">
                Enter Raffle
              </Button>
            </form>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <Table
              type="entries"
              height="entries"
              headers={['Name', 'Type', 'Date']}
              data={r.latest_entries}
              message="No Entries"
            />
          </Card>
        </Col>
      </Row>
    </>
  ) : null;
};

export default Raffle;
