const { createGroupHandler } = require('./createGroupHandler');
const { getGroupDetailsHandler } = require('./getGroupDetailsHandler');
const { getAllGroupsHandler } = require('./getAllGroupsHandler');
const { getAllUsersHandler } = require('./getAllUsersHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'create-new-group') {
    delete msg.path;
    createGroupHandler(msg, callback);
  } else if (msg.path === 'get-group-details') {
    delete msg.path;
    getGroupDetailsHandler(msg, callback);
  } else if (msg.path === 'get-all-groups') {
    delete msg.path;
    getAllGroupsHandler(msg, callback);
  } else if (msg.path === 'get-all-users') {
    delete msg.path;
    getAllUsersHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
