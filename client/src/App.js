import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import store from './store';
import Authenticate from './components/auth/Authenticate';
import setAuthToken from './helpers/tokenHelper';
import { Provider } from 'react-redux';
import Alerter from './components/layout/Alerter';
import { loadUser } from './actions/auth';
import './App.css';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alerter />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/authenticate' component={Authenticate} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
