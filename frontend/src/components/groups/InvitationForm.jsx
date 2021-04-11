/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import SearchBar from '../SearchBar';

class InvitationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationName: '',
      invitationEmail: '',
      email: '',
      showButtons: true,
      validated: false,
      nameErrorMessage: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.length > 0 && nextProps.users !== prevState.users) {
      return {
        names_email: nextProps.users,
        names: nextProps.users.map((res) => res.name),
      };
    }
    return { names_email: [], names: [] };
  }

  onChangeInvitationEmail = (e) => {
    this.setState({
      invitationEmail: e.target.value,
    });
  }

  onSearchName = async (name) => {
    if (!name) {
      this.setState({
        nameErrorMessage: 'Please search a Name of User',
      });
    }
    const emailObj = this.state.names_email.find((res) => res.name === name);
    // this.props.invitedMembers = [...this.props.invitedMembers, emailObj.email];
    // console.log(emailObj.email);
    await this.props.addInvitedMembers(emailObj.email);
    this.setState({
      email: emailObj.email,
      invitationName: name,
      invitationEmail: emailObj.email,
      nameErrorMessage: null,
    });
  }

  render() {
    // console.log(this.props.users);
    return (
      <div>
        <Form noValidate validated={this.state.validated}>
          <Form.Row className="md-0 pd-0">
            <Form.Group as={Col} md="4">
              {this.state.names
              && (
              <SearchBar
                names={this.state.names}
                onSearchName={this.onSearchName}
              />
              )}
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Control type="email" name="invitationEmail" value={this.state.email} placeholder="Email" onChange={this.onChangeInvitationEmail} />
            </Form.Group>
            { this.state.showButtons && (
              <Form.Group className="d-flex m-0 p-0" fluid>
                <Form.Group as={Col} md="auto ml-1 pl-1">
                  <Button variant="outline-danger" id="cancel" onClick={this.props.onCancel}>
                    <X />
                  </Button>
                </Form.Group>
              </Form.Group>
            )}
            {this.state.nameErrorMessage}
            { !this.state.showButtons && (
              <h4 className="text-muted"> Invited ! </h4>
            )}
          </Form.Row>
        </Form>
      </div>
    );
  }
}
export default InvitationForm;
