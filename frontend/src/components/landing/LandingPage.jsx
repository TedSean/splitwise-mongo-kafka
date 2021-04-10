import React from 'react';
import { Redirect } from 'react-router';
import {
  Jumbotron, Container, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../../App.css';
import background from '../../images/background.jpg';

export default function LandingPage() {
  let redirectVar = null;
  if (localStorage.getItem('idToken')) {
    redirectVar = <Redirect to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <NavBar />
        <div>
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <Jumbotron style={{ zIndex: 10, background: 'none' }} fluid>
                <Container>
                  <h1>Splitwise</h1>
                  <h3 className="text-center text-lg-left text-xl-left text-muted font-weight-bold">Less stress when sharing expenses with housemates.</h3>
                  <p className="text">
                    Keep track of your shared expenses and balances
                    &nbsp;
                    <br />
                    with housemates, trips, groups, friends, and family.
                  </p>
                  <Link to="/signup" className="btn btn-info">Sign up</Link>
                </Container>
              </Jumbotron>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
