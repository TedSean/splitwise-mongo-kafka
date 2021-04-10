import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, ListGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import NavBar from '../landing/NavBar';
import LeftSidebar from '../landing/LeftSideBar';
import getGroupDetails from '../../actions/groups/groupDetailsActions';

export default function GroupDetails() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  console.log(showExpenseModal);

  useEffect(() => {
    dispatch(getGroupDetails(params.groupName));
  });

  return (
    <div>
      <NavBar />
      <div>
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <LeftSidebar />
            &nbsp;
          </Col>
          <Col md={{ span: 6 }} className="mx-2">
            <Row>
              <h2>
                {params.groupName}
              </h2>
              <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* <ExpenseModal
                  show={this.state.showExpenseModal}
                  handleClose={this.hideExpenseModal}
                  group_name={this.state.group_name}
                /> */}
                <Button variant="success" onClick={() => setShowExpenseModal(false)}>Add an Expense</Button>
              </Col>
            </Row>
            &nbsp;
            <Row>
              <ListGroup variant="flush" style={{ width: '100%' }}>
                {/* {groupElements} */}
              </ListGroup>
            </Row>
          </Col>
          <Col md={{ span: 2 }}>
            {/* <RightSidebar
              key={this.state.group_name}
              groupName={this.state.group_name}
              updateChild={this.state.updateChild}
              onUpdateChild={this.onUpdateChild}
            /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
