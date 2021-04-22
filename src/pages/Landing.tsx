import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faDollarSign,
  faTicketAlt,
  faTags,
  faDoorOpen,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Aos from 'aos';

import roblox from '../img/roblox.png';
import Components from '../components';
import { RootStore } from '../store';

import 'aos/dist/aos.css';

const StyledJumbo = styled.div`
  display: flex;
  padding-top: 130px;
`;

const StyledJumboDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  text-align: center;
`;

const StyledJumboH1 = styled.h1`
  width: 60%;
  font-weight: 700;
  font-size: 3.5rem;

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const StyledJumboH4 = styled.h4`
  width: 60%;
  color: #d9e3ea;
  font-weight: 400;
  font-size: 1.75rem;
  margin-top: 0.75em;
  margin-bottom: 0.8em;

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const StyledPicture = styled.img`
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
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

const StyledRow = styled(Row)`
  padding: 75px 0 140px 0;
`;

const StyledCol = styled(Col)`
  margin-bottom: 3rem;
  text-align: center;

  & > div {
    margin-top: 0.75rem;
    font-size: 1.25rem;
    color: #d9e3ea !important;
    font-weight: 500;
  }
`;

const StyledTitleHeader = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
`;

const StyledFeatures = styled(Components.Card)`
  height: 100%;
  border-radius: 5px;
  padding: 20px;
`;

const StyledFeaturesIcon = styled.h4`
  padding-bottom: 10px;
  color: #5d5dff;
  font-weight: bold;
`;

const StyledFeaturesTitle = styled.h5`
  font-size: 22px;
  font-weight: 500;
`;

const StyledFeaturesInfo = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #d9e3ea;
`;

const StyledFaqUl = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const StyledFaqLi = styled.li`
  padding: 15px 0 15px 10px;
  color: #d9e3ea;
  border-top: 1px solid #25282c;
  border-bottom: 1px solid #25282c;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const StyledFaqTitle = styled.h3`
  color: #d9e3ea;
`;

const StyledFaqP = styled.p`
  color: #9ba9b4;
`;

const Landing: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const [faqList] = useState([
    {
      title: 'How does RBXRaffles work?',
      content:
        'When we create raffles and giveaways they are always free so that anyone can enter. All you need to do is click on the raffle or giveaway, fill out the captcha, and enter it for free. Everyone can enter a raffle as many times as they want but will have to wait 30 minutes in between each entry.',
    },
    {
      title: 'How many times can I win?',
      content:
        'We have no limit on how many times one person can win a raffle if there is more than one winner to be chosen. This means if you were already picked as a winner for a raffle you will have another chance to be picked again.',
    },
    {
      title: 'How do I withdraw my R$?',
      content:
        'Once you have logged in you will be able to head over to the withdraw page. There you will be prompted to join our Roblox group and we will transfer the amount of R$ you have requested on site.',
    },
  ]);

  const [faqState, setFaqState] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });

  const settingsState = useSelector((state: RootStore) => state.settings);

  const onFaqClick = (e: React.MouseEvent<HTMLLIElement>, title: string) => {
    e.preventDefault();
    if (title === faqState.title) return;

    const faq = faqList.find((f) => f.title === title);
    if (!faq) return;

    setFaqState({ ...faq });
  };

  return (
    <>
      <StyledJumbo>
        <StyledJumboDiv>
          <StyledJumboH1 data-aos="fade-down">The Best Way To Win Free Robux</StyledJumboH1>
          <StyledJumboH4 data-aos="fade-down" data-aos-delay="250">
            RBXRaffles hosts only free raffles and giveaways where anyone can enter.
          </StyledJumboH4>
          <div data-aos="fade-up">
            <StyledPicture src={roblox} alt="Roblox Render" />
          </div>
        </StyledJumboDiv>
      </StyledJumbo>

      <Row className="mb-5">
        <Col lg={6} className="mb-3">
          <Components.Card className="bg-success" data-aos="fade-right">
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
          <Components.Card className="bg-danger" data-aos="fade-left">
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

      <StyledRow id="features">
        <StyledCol sm={12} data-aos="fade-down">
          <StyledTitleHeader>Awesome Features</StyledTitleHeader>
          <div>
            We are constantly updating and adding lots of new features for you guys to win free
            Robux!
          </div>
        </StyledCol>
        <Col sm={12} lg={4} className="mb-3" data-aos="fade-down">
          <StyledFeatures>
            <StyledFeaturesIcon>
              <FontAwesomeIcon icon={faTicketAlt} size="2x" />
            </StyledFeaturesIcon>
            <StyledFeaturesTitle>Free Raffles</StyledFeaturesTitle>
            <StyledFeaturesInfo>
              You will never have to pay to enter into any of our raffles as all of them are free.
            </StyledFeaturesInfo>
          </StyledFeatures>
        </Col>
        <Col sm={12} lg={4} className="mb-3" data-aos="fade-down" data-aos-delay="150">
          <StyledFeatures>
            <StyledFeaturesIcon>
              <FontAwesomeIcon icon={faTags} size="2x" />
            </StyledFeaturesIcon>
            <StyledFeaturesTitle>Promo Codes</StyledFeaturesTitle>
            <StyledFeaturesInfo>
              Redeem free promotion codes that are released on our Discord or Twitter for Robux.
            </StyledFeaturesInfo>
          </StyledFeatures>
        </Col>
        <Col sm={12} lg={4} className="mb-3" data-aos="fade-down" data-aos-delay="300">
          <StyledFeatures>
            <StyledFeaturesIcon>
              <FontAwesomeIcon icon={faDoorOpen} size="2x" />
            </StyledFeaturesIcon>
            <StyledFeaturesTitle>Unlimited Entries</StyledFeaturesTitle>
            <StyledFeaturesInfo>
              You can enter as many times as you want into any raffle every 30 minutes.
            </StyledFeaturesInfo>
          </StyledFeatures>
        </Col>
        <Col sm={12} lg={4} className="mb-3" data-aos="fade-down" data-aos-delay="300">
          <StyledFeatures>
            <StyledFeaturesIcon>
              <FontAwesomeIcon icon={faUsers} size="2x" />
            </StyledFeaturesIcon>
            <StyledFeaturesTitle>Referrals</StyledFeaturesTitle>
            <StyledFeaturesInfo>
              Refer your friends and earn 10% of all their winnings forever.
            </StyledFeaturesInfo>
          </StyledFeatures>
        </Col>
      </StyledRow>

      <StyledRow id="faq">
        <StyledCol sm={12} data-aos="fade-down">
          <StyledTitleHeader>Frequently Asked Questions</StyledTitleHeader>
        </StyledCol>
        <Col sm={12} lg={4} data-aos="fade-right" className="mb-3">
          <StyledFaqUl>
            {faqList.map((faq, i) => (
              <StyledFaqLi onClick={(e) => onFaqClick(e, faq.title)} key={i}>
                {faq.title}
              </StyledFaqLi>
            ))}
          </StyledFaqUl>
        </Col>
        <Col sm={12} lg={8} data-aos="fade-left">
          <div>
            <StyledFaqTitle>{faqState.title ? faqState.title : faqList[0].title}</StyledFaqTitle>
            <StyledFaqP>{faqState.content ? faqState.content : faqList[0].content}</StyledFaqP>
          </div>
        </Col>
      </StyledRow>
    </>
  );
};

export default Landing;
