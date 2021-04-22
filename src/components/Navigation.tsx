import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RootStore } from 'store';

const StyledNavbar = styled(Navbar)`
  background: transparent !important;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  color: #d9e3ea !important;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.3rem;

  &:hover {
    text-decoration: none;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: #d9e3ea !important;
`;

const StyledLoginButton = styled.a`
  background-color: #e53e3e;
  border-radius: 0.15rem;
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: #c53030;
    color: #fff;
  }
`;

const StyledDivider = styled.span`
  height: 1.5rem;
  border: 0 solid #c5d2dc;
  border-right-width: 1px;
  margin-right: 0.75rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.75rem;
`;

const StyledNavbarToggler = styled(Navbar.Toggle)`
  border: none;

  & > svg {
    color: #fff;
  }
`;

const StyledDropdown = styled(NavDropdown)`
  color: #fff;

  & > a {
    padding-left: 0;
    color: #fff;
  }

  & > .dropdown-menu {
    background-color: #25282c;

    & > .dropdown-item {
      color: #fff;

      &:hover {
        background-color: transparent;
        color: #4b4acf;
      }
    }
  }
`;

const DropdownDivider = styled(NavDropdown.Divider)`
  border-top: none;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
`;

const StyledBalanceContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff !important;
`;

const StyledBalanceSign = styled.div`
  margin-right: 10px;
  padding: 1px 5px;
  background-color: #4caf50;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
`;

const Navigation: React.FC = () => {
  const [ref, setRef] = useState('');

  useEffect(() => {
    const refId = localStorage.getItem('ref');

    if (refId) {
      setRef(refId);
    }
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const destination = document.getElementById(id);
    destination && destination.scrollIntoView({ behavior: 'smooth' });
  };

  const usersState = useSelector((state: RootStore) => state.users);
  const { loggedIn } = usersState;

  return !loggedIn ? (
    <StyledNavbar bg="light" expand="lg">
      <Container>
        <StyledNavbarBrand as={Link} to="/">
          RBXRaffles
        </StyledNavbarBrand>
        <StyledNavbarToggler aria-controls="main-navbar">
          <FontAwesomeIcon icon={faBars} />
        </StyledNavbarToggler>
        <Navbar.Collapse id="main-navbar">
          <Nav className="ml-auto mr-auto">
            <StyledNavLink to="/home">Home</StyledNavLink>
            <StyledNavLink
              to="/features"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollTo(e, 'features')}
            >
              Features
            </StyledNavLink>
            <StyledNavLink
              to="/faq"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollTo(e, 'faq')}
            >
              FAQ
            </StyledNavLink>
          </Nav>
          <Nav>
            <StyledLoginButton
              href={`/api/auth/google${ref ? `/?ref=${ref}` : ''}`}
              className="btn"
              onClick={() => {
                const refId = localStorage.getItem('ref');
                if (refId) {
                  localStorage.removeItem('ref');
                }
              }}
            >
              <StyledIcon icon={faGoogle} />
              <StyledDivider />
              Sign in with Google
            </StyledLoginButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  ) : (
    <StyledNavbar bg="light" expand="lg">
      <Container>
        <StyledNavbarBrand as={Link} to="/raffles">
          RBXRaffles
        </StyledNavbarBrand>
        <StyledNavbarToggler aria-controls="main-navbar">
          <FontAwesomeIcon icon={faBars} />
        </StyledNavbarToggler>
        <Navbar.Collapse id="main-navbar">
          <Nav className="ml-auto mr-auto">
            <StyledNavLink className="nav-link" as={Link} to="/raffles">
              Raffles
            </StyledNavLink>
            <StyledNavLink className="nav-link" as={Link} to="/withdraw">
              Withdraw
            </StyledNavLink>
            <StyledNavLink className="nav-link" as={Link} to="/bonus">
              Bonus
            </StyledNavLink>
            <StyledNavLink className="nav-link" as={Link} to="/referrals">
              Referrals
            </StyledNavLink>
          </Nav>

          <div className="navbar-nav mr-4">
            <StyledBalanceContainer className="nav-link">
              <StyledBalanceSign>R$</StyledBalanceSign>
              <div>{usersState.user.balance.toFixed(2)}</div>
            </StyledBalanceContainer>
          </div>
          <StyledDropdown title={usersState.user.name} id="userDropdown">
            <NavDropdown.Item as={Link} to="/profile">
              Profile
            </NavDropdown.Item>
            <DropdownDivider />
            <NavDropdown.Item href="/api/auth/logout">Logout</NavDropdown.Item>
          </StyledDropdown>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Navigation;
