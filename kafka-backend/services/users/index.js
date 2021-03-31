const { getProfileHandler } = require('./getProfileHandler');
const { updateProfileHandler } = require('./updateProfileHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-get-profile') {
    delete msg.path;
    getProfileHandler(msg, callback);
  } else if (msg.path === 'user-update-profile') {
    delete msg.path;
    updateProfileHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
