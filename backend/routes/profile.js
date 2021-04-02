const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../utils/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  // console.log('Inside Profile Get Request');
  // console.log(req);
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  // console.log(decoded._id);

  req.body.path = 'user-get-profile';
  req.body.userId = decoded.id;

  kafka.makeRequest('users', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        name: results.data.name,
        email: results.data.email,
        phone: results.data.phone,
        language: results.data.language,
        currency: results.data.currency,
        timezone: results.data.timezone,
        image: results.data.image,
        message: 'PROFILE_GET_SUCCESS',
      }));
    }
  });
});

router.put('/', checkAuth, (req, res) => {
  // console.log('Inside Profile Put Request');
  // console.log(req.body);
  req.body.path = 'user-update-profile';

  kafka.makeRequest('users', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.json({
        status: 'error',
        msg: err,
      });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        name: results.data.name,
        email: results.data.email,
        phone: results.data.phone,
        language: results.data.language,
        currency: results.data.currency,
        timezone: results.data.timezone,
        image: results.data.image,
        message: 'PROFILE_UPDATE_SUCCESS',
      }));
    }
  });
});

module.exports = router;
