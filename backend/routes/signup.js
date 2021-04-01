/* eslint-disable no-underscore-dangle */
const express = require('express');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
const config = require('../utils/config');
const { auth } = require('../utils/passport');

const router = express.Router();
auth();

router.post('/', async (req, res) => {
  req.body.path = 'user-signup';
  kafka.makeRequest('account', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: results.message }));
    } else {
      // const data = JSON.parse(results.data);
      // console.log(`Id: ${data._id}`);
      const token = jwt.sign({
        id: results.data._id,
      },
      config.secret,
      {
        expiresIn: 1008000,
      });
      const jwtToken = `JWT ${token}`;
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
        message: 'NEW_USER_CREATED',
        idToken: jwtToken,
      }));
    }
  });
});

module.exports = router;
