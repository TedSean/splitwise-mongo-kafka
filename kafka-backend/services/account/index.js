const { signUpHandler } = require('./signUpHandler');
const { loginHandler } = require('./loginHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-signup') {
    delete msg.path;
    signUpHandler(msg, callback);
  } else if (msg.path === 'user-login') {
    delete msg.path;
    loginHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
