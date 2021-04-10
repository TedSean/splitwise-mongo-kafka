const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../utils/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/invites', checkAuth, (req, res) => {
  req.body.path = 'get-groups-invites';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupInvites: results.data,
      }));
      // res.status(200).send(JSON.parse(results.data));
    }
  });
});

router.get('/memberships', checkAuth, (req, res) => {
  req.body.path = 'get-groups-memberships';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      console.log(`member: ${JSON.stringify(results)}`);
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupMemberships: results.data,
      }));
      // res.status(200).send(JSON.parse(results.data));
    }
  });
});

router.get('/users', checkAuth, (req, res) => {
  req.body.path = 'get-all-users';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_USERS' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ users: results.data }));
    }
  });
});

router.get('/:groupName', checkAuth, (req, res) => {
  req.body.path = 'get-group-details';
  req.body.params = req.params.groupName;
  console.log(req.body.params);
  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end({ message: 'SOMETHING_WENT_WRONG' });
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(results.data);
    }
  });
});

router.post('/', checkAuth, (req, res) => {
  req.body.path = 'create-new-group';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'DUPLICATE_GROUP' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'GROUP_CREATED' }));
    }
  });
});

router.post('/accept', checkAuth, (req, res) => {
  req.body.path = 'group-accept-invite';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INVITE_ACCEPTED' }));
    }
  });
});

router.post('/reject', checkAuth, (req, res) => {
  req.body.path = 'group-reject-invite';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INVITE_REJECTED' }));
    }
  });
});

module.exports = router;
