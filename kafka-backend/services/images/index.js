const { userUpdateImageHandler } = require('./userUpdateImageHandler');
const { groupUpdateImageHandler } = require('./groupUpdateImageHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-update-image') {
    delete msg.path;
    userUpdateImageHandler(msg, callback);
  } else if (msg.path === 'group-update-image') {
    delete msg.path;
    groupUpdateImageHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
