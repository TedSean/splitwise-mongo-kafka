import { GET_GROUP_INVITES } from '../../actions/constant-types';

const initState = {
  groupInvites: {},
};

const getGroupInvitesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_GROUP_INVITES:
      return {
        ...state,
        groupInvites: action.payload,
      };
    default:
      return state;
  }
};

export default getGroupInvitesReducer;
