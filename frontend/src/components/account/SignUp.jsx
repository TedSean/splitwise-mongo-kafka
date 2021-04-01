import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Container, Form, Button, Row, Col,
} from 'react-bootstrap';
import userSignUp from '../../actions/account/signUpUserAction';
import NavBar from '../landing/NavBar';
import SplitwiseImage from '../../images/logo.svg';
// import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
    };
    document.title = 'Splitwise';
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = (e) => {
    // prevent page from refresh
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
    } else {
      e.preventDefault();
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      this.props.userSignUp(data);

      this.setState({
        signUp: true,
      });
    }
  }

  handleClear = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  }

  render() {
    // redirect based on successful signup
    let redirectVar = null;
    let message = '';
    console.log(this.props);
    if (this.props.user.message === 'NEW_USER_CREATED' && this.state.signUp) {
      // alert('You have registered successfully');
      localStorage.setItem('name', this.props.user.name);
      localStorage.setItem('idToken', this.props.user.idToken);
      redirectVar = <Redirect to="/home" />;
    } else if (this.props.user.message === 'USER_ALREADY_EXISTS' && this.state.signUp) {
      message = 'User with email id is already registered';
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>
              <img src={SplitwiseImage} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="Splitwise" />
            </Col>
            <Col>
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <div style={{ color: '#ff0000' }}>{message}</div>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter Name"
                    onChange={this.handleNameChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter email"
                    onChange={this.handleEmailChange}
                    pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              &nbsp;&nbsp;
                <Button variant="secondary" onClick={this.handleClear}>
                  Clear
                </Button>
              </Form>
            </Col>
            <Col xs lg="2">{'\u00A0'}</Col>
          </Row>

        </Container>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.signup.user,
});

export default connect(mapState, { userSignUp })(SignUp);
