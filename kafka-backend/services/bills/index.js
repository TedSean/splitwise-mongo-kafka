const { addExpenseHandler } = require('./addExpenseHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'add-expense') {
    delete msg.path;
    addExpenseHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
