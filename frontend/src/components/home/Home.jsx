import React, { Component } from 'react';
import NavBar from '../landing/NavBar';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>
          Welcome,
          {localStorage.getItem('name')}
        </h1>
      </div>
    );
  }
}

export default Home;
