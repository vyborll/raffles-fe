import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding: 10px 0;

  @media (max-width: 575.98px) {
    & > div {
      margin-bottom: 10px;
      width: 100%;
    }
  }
`;

const StyledLink = styled.a`
  color: #5d5dff;

  &:hover {
    color: #fff;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <div>
        <StyledLink
          target="_blank"
          href="https://twitter.com/rbxraffles"
          rel="noreferrer"
          className="fa-stack fa-1x"
        >
          <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
          <FontAwesomeIcon icon={faTwitter} className="fa-stack-1x" />
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://discord.gg/kpMbHdNR8d"
          rel="noreferrer"
          className="fa-stack fa-1x"
        >
          <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
          <FontAwesomeIcon icon={faDiscord} className="fa-stack-1x" />
        </StyledLink>
      </div>
      <div>&copy; {new Date().getFullYear()} RBXRaffles. All Rights Reserved.</div>
    </StyledFooter>
  );
};

export default Footer;
