import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import Login from './account/Login';
import SignUp from './account/SignUp';
import Profile from './user/Profile';
import Home from './home/Home';

function Main() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
    </div>
  );
}

export default Main;
