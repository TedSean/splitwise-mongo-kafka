import React from 'react';
import {
  Button, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function GroupMembership(props) {
  const onLeave = () => {

  };
  const groupName = props.groupMembership;
  return (
    <div>
      <Card className="m-2" style={{ width: '18rem' }}>
        {/* <Card.Img variant="top"

        style={{ width: '100%', height: '60%' }} src={group_image} /> */}
        <Card.Body>
          <Card.Title>{groupName}</Card.Title>
          <Link to={`/groupdetails/${groupName}`}>
            <Button variant="info">Visit Group</Button>
          </Link>
          {'\u00A0'}
          {'\u00A0'}
          <Button variant="danger" onClick={onLeave}>Leave Group</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
