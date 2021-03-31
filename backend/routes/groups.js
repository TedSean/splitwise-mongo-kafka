const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../utils/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  req.body.path = 'get-all-groups';

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
      res.end({ message: 'SOMETHING_WENT_WRONG' });
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(results.data);
      // res.status(200).send(JSON.parse(results.data));
    }
  });
});

router.get('/:groupName', checkAuth, (req, res) => {
  req.body.path = 'get-group-details';
  req.body.params = req.params.groupName;

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
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(results.data);
      // res.status(200).send(JSON.parse(results.data));
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
      res.end(JSON.stringify({ message: 'GROUP_ALREADY_EXISTS' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(results.data);
    }
  });
});

module.exports = router;
