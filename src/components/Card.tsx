import React, { ReactElement } from 'react';
import { Card as BCard } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(BCard)`
  background: #25282c;
  border-radius: 2px;
  border: none;
`;

const Card: React.FC<{
  className?: string;
  children: ReactElement[] | ReactElement;
}> = ({ children, ...rest }) => {
  return (
    <StyledCard {...rest}>
      <StyledCard.Body>{children}</StyledCard.Body>
    </StyledCard>
  );
};

export default Card;
