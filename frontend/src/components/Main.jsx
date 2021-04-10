import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import Login from './account/Login';
import SignUp from './account/SignUp';
import Profile from './user/Profile';
import Home from './home/Home';
import NewGroup from './groups/NewGroup';
import Groups from './groups/Groups';
import GroupDetails from './groups/GroupDetails';

export default function Main() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/newgroup" component={NewGroup} />
      <Route path="/groups" component={Groups} />
      <Route path="/groupdetails/:groupName" component={GroupDetails} />
    </div>
  );
}
