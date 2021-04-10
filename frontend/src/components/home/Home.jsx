import React from 'react';
import { Redirect } from 'react-router';
import NavBar from '../landing/NavBar';

export default function Home() {
  let redirectVar = null;
  if (!localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/" />;
  }
  return (
    <div>
      {redirectVar}
      <NavBar />
      <h1>
        Welcome,
        {localStorage.getItem('name')}
      </h1>
    </div>
  );
}
