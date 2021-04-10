/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroupMemberships } from '../../actions/groups/getGroupsActions';

export default function LeftSideBar() {
  const groupLinks = [];
  const groupList = useSelector((state) => state.getGroupMembershipsReducer.groupMemberships);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupMemberships());
  }, [dispatch]);

  if (groupList && groupList.length > 0) {
    groupList.map((groupName) => {
      groupLinks.push(
        <Link className="nav-link" to={`/groupdetails/${groupName}`}>
          {groupName}
        </Link>,
      );
    });
  }
  return (
    <Nav defaultActiveKey="/home" className="flex-column mt-3">
      <Nav.Link href="/home">Dashboard</Nav.Link>
      <Nav.Link href="/groups">My Groups</Nav.Link>
      <Nav.Link href="/recentactivity">Recent Activity</Nav.Link>
      <hr />
      <div className="px-3 text-muted">Groups</div>
      {groupLinks}
    </Nav>
  );
}
