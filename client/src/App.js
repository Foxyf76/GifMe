import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import store from './store';
import Authenticate from './components/auth/Authenticate';
import Favorite from './components/favourite/Favourite';
import setAuthToken from './helpers/tokenHelper';
import { Provider } from 'react-redux';
import Alerter from './components/layout/Alerter';
import { loadUser } from './actions/auth';
import './App.css';
import Navbar from './components/layout/Navbar';
import Gif from './components/gif/Gif';
import PrivateRoute from './components/routing/PrivateRoute';

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
          <Navbar />
          <Alerter />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/authenticate' component={Authenticate} />
            <Route path='/gif/:id' component={Gif} />
            <PrivateRoute exact path='/favourites' component={Favorite} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
