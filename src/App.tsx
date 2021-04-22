import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import styled from 'styled-components';
import Aos from 'aos';

import PrivateRoute from './utils/PrivateRoute';
import GuestRoute from './utils/GuestRoute';
import { RootStore } from './store';
import { getUser, updateBalance } from './store/users/actions';
import { socket } from './utils/socket';

import Pages from './pages';
import Components from './components';
import { getSettings, setTotals } from './store/settings/actions';
import { getRaffles, updateRaffle, updateRaffleStatus } from './store/raffles/actions';
import { setGroup } from './store/withdraws/actions';

import MySwal from './utils/swal';

const StyledContainer = styled(Container)`
  min-height: 100vh;
`;

const App: any = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getRaffles());
    dispatch(getSettings());

    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) {
      if (localStorage.getItem('ref')) {
        localStorage.removeItem('ref');
      }

      localStorage.setItem('ref', ref);
    }

    socket.on('site:stats', (data: { users: number; paid: number }) => {
      dispatch(setTotals({ ...data }));
    });

    socket.on(
      'raffle:update',
      (data: { id: string; users_entered: number; latest_entries: [] }) => {
        dispatch(updateRaffle(data));
      },
    );

    socket.on('user:bonus', (data: { robux: number }) => {
      MySwal.fire({
        icon: 'success',
        title: '<h1 class="text-white mb-0">Success</h1>',
        html: `<p class="text-white">You have claimed a bonus worth R$ ${data.robux}</p>`,
      });
    });

    socket.on('user:update', (data: { robux: number }) => {
      dispatch(updateBalance(data.robux));
    });

    socket.on('raffle:end', (data: { id: string }) => {
      dispatch(updateRaffleStatus(data.id, 'ENDED'));
    });

    socket.on('group', (data: { id: string }) => {
      dispatch(setGroup(data.id));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const usersState = useSelector((state: RootStore) => state.users);
  const rafflesState = useSelector((state: RootStore) => state.raffles);
  const settingsState = useSelector((state: RootStore) => state.settings);
  const loggedIn = usersState.loggedIn;

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: (number) => number + 's',
      ss: '%ds ago',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mth',
      MM: '%dmth',
      y: '1y',
      yy: '%dy',
    },
  });

  if (!usersState.loading && !rafflesState.loading) {
    const loading: HTMLElement | null = document.getElementById('loadingScreen');
    if (!loading) {
      return;
    } else {
      loading.classList.add('loadingFinished');
      Aos.refresh();
    }
  }

  return usersState.loading && rafflesState.loading && settingsState.loading ? null : (
    <BrowserRouter>
      <Components.Broadcast />
      <Components.Navigation />

      <StyledContainer>
        <Switch>
          <GuestRoute path="/" component={Pages.Landing} isAuthenticated={loggedIn} exact />
          <PrivateRoute
            path="/raffles"
            component={Pages.Raffles}
            isAuthenticated={loggedIn}
            exact
          />
          <PrivateRoute path="/bonus" component={Pages.Bonus} isAuthenticated={loggedIn} exact />
          <PrivateRoute
            path="/profile"
            component={Pages.Profile}
            isAuthenticated={loggedIn}
            exact
          />
          <PrivateRoute
            path="/raffle/:id"
            component={Pages.Raffle}
            isAuthenticated={loggedIn}
            exact
          />
          <PrivateRoute
            path="/referrals"
            component={Pages.Referrals}
            isAuthenticated={loggedIn}
            exact
          />
          <PrivateRoute
            path="/withdraw"
            component={Pages.Withdraw}
            isAuthenticated={loggedIn}
            exact
          />
        </Switch>
      </StyledContainer>
      <Container>
        <Components.Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
