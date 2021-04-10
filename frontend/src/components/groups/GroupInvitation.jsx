import React from 'react';
import {
  Button, Card,
} from 'react-bootstrap';
import {
  useDispatch,
} from 'react-redux';
import { acceptInvite, rejectInvite } from '../../actions/groups/groupInviteActions';

export default function GroupInvitation(props) {
  const dispatch = useDispatch();
  const data = {
    groupName: props.groupInvite,
  };
  const onAcceptInvite = () => {
    dispatch(acceptInvite(data));
    props.onUpdateInvitation();
  };

  const onRejectInvite = () => {
    dispatch(rejectInvite(data));
    props.onUpdateInvitation();
  };

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={group_image} /> */}
      <Card.Body>
        <Card.Title>{props.groupInvite}</Card.Title>
        <Button variant="info" onClick={onAcceptInvite}>Accept Invite</Button>
        {'\u00A0'}
        {'\u00A0'}
        <Button variant="danger" onClick={onRejectInvite}>Reject Invite</Button>
      </Card.Body>
    </Card>
  );
}
