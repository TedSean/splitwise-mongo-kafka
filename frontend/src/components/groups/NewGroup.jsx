/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Row, Col, Form, Button, Image, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import NavBar from '../landing/NavBar';
import { getAllUsers, createGroup } from '../../actions/groups/createGroupActions';
import InvitationForm from './InvitationForm';

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationListSize: 1,
      imageFormValidated: false,
      saveFormValidated: false,
      invitedMembers: [],
      message: '',
    };
    // this.getAllNames();
    this.props.getAllUsers();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSave = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        saveFormValidated: true,
      });
    } else {
      e.preventDefault();
      const data = {
        groupName: this.state.groupName,
        invitedMembers: this.state.invitedMembers,
      };
      this.props.createGroup(data);
      this.setState({
        message: this.props.message,
      });
    }
  }

  onGroupImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  onCancel = () => {
    // console.log(email);
    this.setState((prevState) => ({ invitationListSize: prevState.invitationListSize - 1 }));
  }

  onAddInvitationForm = () => {
    // invitationListSize;
    this.setState((prevState) => ({ invitationListSize: prevState.invitationListSize + 1 }));
  }

  addInvitedMembers = async (invitedMember) => {
    // console.log(invitedMember);
    // console.log(this.state.invitedMembers);
    await this.setState((prevState) => ({ invitedMembers: [...prevState.invitedMembers, invitedMember] }));
    // console.log(this.state.invitedMembers);
  }

  render() {
    let redirectVar = null;
    // console.log(this.state.message);
    if (this.state.message === 'GROUP_CREATED') {
      redirectVar = <Redirect to="/home" />;
    }
    let selfMember = null;
    const invitationForms = [];
    let errorMessage = null;

    if (this.state.message === 'DUPLICATE_GROUP') {
      errorMessage = <Alert variant="danger">Group Name Taken. Please enter unique group name.</Alert>;
    }
    selfMember = (
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Control type="text" name="invite_name" placeholder={localStorage.getItem('name')} disabled />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Control type="email" name="invite_email" placeholder={localStorage.getItem('email')} disabled />
        </Form.Group>
      </Form.Row>
    );

    if (this.props.users) {
      // console.log(this.state.invitationListSize);
      for (let i = 1; i <= this.state.invitationListSize; i += 1) {
        invitationForms.push(
          <InvitationForm
            users={this.props.users}
            invitedMembers={this.state.invitedMembers}
            addInvitedMembers={this.addInvitedMembers}
            groupName={this.state.groupName}
            onCancel={this.onCancel}
          />,
        );
      }
    }

    const groupImage = 'https://splitwise-imagestore.s3-us-west-2.amazonaws.com/groupImages/groupPlaceholder.png';
    const filename = this.state.filename || 'Choose Group Image';

    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <Form noValidate validated={this.state.imageFormValidated} onSubmit={this.onUpload}>
                <Form.Row className="mt-4">
                  <Form.Group as={Col} md={3}>
                    <Image style={{ width: '17rem' }} src={groupImage} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3}>
                    <Form.File
                      className="mt-3"
                      name="image"
                      id="image"
                      style={{ width: '17rem' }}
                      accept="image/*"
                      label={filename}
                      onChange={this.onGroupImageChange}
                      custom
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload a group image.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit">Upload</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
            <Col md={{ span: 6 }}>
              <h5 className="text-muted">START A NEW GROUP</h5>
              <div as={Col} md={{ span: 2 }}>
                {errorMessage}
              </div>
              <Form noValidate validated={this.state.saveFormValidated}>
                <Form.Row>
                  <Form.Group as={Col} md={4}>
                    <Form.Control
                      type="text"
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a group name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Group as={Col} md="3">
                    <Button type="submit">Create</Button>
                  </Form.Group> */}
                </Form.Row>
              </Form>
              <Divider />
              <h5 className="text-muted">GROUP MEMBERS</h5>
              <Form onSubmit={this.onSave}>
                {selfMember}
                <div>
                  {invitationForms}
                </div>
                <Form.Row>
                  <Form.Group>
                    <Button onClick={this.onAddInvitationForm}>+ Add a Person</Button>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  {/* <Link to="/home"> */}
                  <Button type="submit">Save</Button>
                  {/* </Link> */}
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.getAllUsersReducer.users,
  message: state.createGroupReducer.message,
});

export default connect(mapState, { getAllUsers, createGroup })(NewGroup);
