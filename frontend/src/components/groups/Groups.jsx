import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../landing/NavBar';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';
import LeftSideBar from '../landing/LeftSideBar';
import SearchBar from '../SearchBar';
import { getGroupInvites, getGroupMemberships } from '../../actions/groups/getGroupsActions';

export default function Groups() {
  const [updated, setUpdated] = useState(false);
  const [groupSearchName, setGroupSearchName] = useState('');
  const groupInvites = useSelector((state) => state.getGroupInvitesReducer.groupInvites);
  const groupMemberships = useSelector((st) => st.getGroupMembershipsReducer.groupMemberships);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupInvites());
    dispatch(getGroupMemberships());
  }, [dispatch]);

  const onUpdateInvitation = () => {
    setUpdated(true);
  };

  const onSearchName = (groupName) => {
    setGroupSearchName(groupName);
  };

  useLayoutEffect(() => {
    dispatch(getGroupInvites());
    dispatch(getGroupMemberships());
    return (() => setUpdated(false));
  }, [dispatch, updated]);

  return (
    <div>
      <NavBar />
      {/* {errorMessage} */}
      <div className="mt-5">
        <Row>
          <Col md={{ offset: 1, span: 2 }} className="flex-column">
            <LeftSideBar />
          </Col>
          <Col>
            <Row>
              <Col md={6} className="pr-2">
                {groupMemberships.length > 0 && (
                <SearchBar
                  names={groupMemberships}
                  onSearchName={onSearchName}
                  onUpdateInvitation={onUpdateInvitation}
                />
                )}
              </Col>
              <Col md={1} className="p-0">
                <Link
                  variant="btn-info"
                  to={{
                    pathname: '/groupdetails',
                    state: { groupName: groupSearchName },
                  }}
                >
                  <ArrowRightSquareFill size="38px" />
                </Link>
              </Col>
            </Row>
            {groupInvites.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Invitations</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupInvites.map((groupInvite) => (
                    <GroupInvitation
                      key={groupInvite}
                      groupInvite={groupInvite}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
            {groupMemberships.length > 0 && (
            <Col md={{ span: 8 }} className="mt-4">
              <h3>Group Membership</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {groupMemberships.map((groupMembership) => (
                    <GroupMembership
                      key={groupMembership}
                      groupMembership={groupMembership}
                      onUpdateInvitation={onUpdateInvitation}
                    />
                  ))}
                </Container>
              </div>
            </Col>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
