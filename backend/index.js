const app = require('./app');

const ping = require('./routes/ping');
const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const images = require('./routes/images');
const groups = require('./routes/groups');
const bills = require('./routes/bills');
// const createGroup = require('./routes/groups/createGroup');
// const inviteMember = require('./routes/groups/inviteMember');
// const leavegroup = require('./routes/groups/leavegroup');
// const acceptInvite = require('./routes/groups/acceptInvite');
// const addbill = require('./routes/addbill');
// const balances = require('./routes/balances');
// const settle = require('./routes/settle');
// const recentactivity = require('./routes/recentactivity');
// const getGroups = require('./routes/groups/getGroups');
// const groupdetails = require('./routes/groups/groupdetails');
// const allnames = require('./routes/allnames');

app.use('/api/ping', ping);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/profile', profile);
app.use('/api/images', images);
app.use('/api/groups', groups);
app.use('/api/bills', bills);
// app.use('/api/createGroup', createGroup);
// app.use('/api/inviteMember', inviteMember);
// app.use('/api/leavegroup', leavegroup);
// app.use('/api/acceptInvite', acceptInvite);
// app.use('/api/addbill', addbill);
// app.use('/api/balances', balances);
// app.use('/api/settle', settle);
// app.use('/api/recentactivity', recentactivity);
// app.use('/api/getGroups', getGroups);
// app.use('/api/groupdetails', groupdetails);
// app.use('/api/allnames', allnames);

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
