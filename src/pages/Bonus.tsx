import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

import MySwal from '../utils/swal';

import Button from '../components/Button';
import Box from '../components/Box';
import Card from '../components/Card';
import Input from '../components/Input';
import axios from 'axios';
import { RootStore } from 'store';

const StyledDiscord = styled.a`
  background-color: #7289da;
  color: #fff;

  &:hover {
    color: #fff;
    background-color: rgba(238, 255, 255, 0.3);
  }
`;

const Bonus: React.FC = () => {
  const [bonus, setBonus] = useState<{
    code: string;
  }>({
    code: '',
  });

  const usersState = useSelector((state: RootStore) => state.users);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBonus({ ...bonus, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bonus.code) {
      return MySwal.fire({
        icon: 'error',
        title: '<h1 class="text-white mb-0">Error</h1>',
        html: '<p class="text-white">You did not enter a valid code</p>',
      });
    }

    axios
      .post('/api/codes/redeem', {
        code: bonus.code,
      })
      .then((response) => {
        MySwal.fire({
          icon: 'success',
          title: '<h1 class="text-white mb-0">Success</h1>',
          html: `<p class="text-white">${`Redeemed promo code for R$ ${response.data.value}`}</p>`,
        });

        setBonus({ code: '' });
      })
      .catch((err) => {
        MySwal.fire({
          icon: 'error',
          title: '<h1 class="text-white mb-0">Error</h1>',
          html: `<p class="text-white">${
            err.response?.data?.message || 'Could not redeem promo code.'
          }</p>`,
        });
      });
  };

  return (
    <>
      <Row className="mt-5">
        <Col sm={12} lg={6} className="mb-3">
          <Card className="h-100">
            <h4 className="mb-4">Promotions Info</h4>
            <Box
              title="YouTube Bonus:"
              body={usersState.user.youtube_bonus ? 'Claimed R$ 0.5' : 'Unclaimed R$ 0.5'}
              className={usersState.user.youtube_bonus ? 'text-success' : 'text-danger'}
            />
            <Box
              title="Discord Bonus:"
              body={usersState.user.discord_bonus ? 'Claimed R$ 0.5' : 'Unclaimed R$ 0.5'}
              className={usersState.user.discord_bonus ? 'text-success' : 'text-danger'}
            />
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-3">
          <Card className="h-100">
            <h4 className="mb-4">Promotions</h4>
            <div className="promo-container">
              <a
                target="_blank"
                href="/api/bonus/youtube"
                rel="noreferrer"
                className="btn btn-danger btn-block"
              >
                <FontAwesomeIcon className={'mr-1'} icon={faYoutube} />
                Subscribe to YouTube
                <span className="d-block">(R$ 0.5)</span>
              </a>
              <StyledDiscord
                target={'_blank'}
                href={'/api/bonus/discord'}
                rel="noreferrer"
                className={'btn btn-block'}
              >
                <FontAwesomeIcon className={'mr-1'} icon={faDiscord} />
                Join Discord
                <span className="d-block">(R$ 0.5)</span>
              </StyledDiscord>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <h4 className="mb-4">Promo Code</h4>
            <span className="d-block mb-2">Enter Code</span>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-4">
                <Input
                  onChange={(e) => onChange(e)}
                  type="text"
                  name="code"
                  placeholder="Code"
                  value={bonus.code}
                />
              </div>
              <Button className="btn btn-block">Redeem Code</Button>
            </form>
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <h4 className="mb-4">How To Find Promo Codes</h4>
            <p className="mb-2">
              We release codes on both Discord and Twitter so make sure to follow us on both
              platforms to be alerted when a new code is released.
            </p>
            <p className="mb-2">
              All codes have limited uses so try to be one of the first to redeem them before they
              expire.
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Bonus;
