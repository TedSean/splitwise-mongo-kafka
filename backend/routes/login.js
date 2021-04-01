/* eslint-disable no-underscore-dangle */
const express = require('express');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
const config = require('../utils/config');
const { auth } = require('../utils/passport');

const router = express.Router();

auth();

router.post('/', async (req, res) => {
  req.body.path = 'user-login';
  kafka.makeRequest('account', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.json({
        status: 'error',
        msg: err,
      });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'USER_DOES_NOT_EXIST' }));
    } else if (results.status === 403) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INCORRECT_PASSWORD' }));
    } else {
      const data = JSON.parse(results.data);
      // console.log(`Id: ${data._id}`);
      const token = jwt.sign({
        id: data._id,
      },
      config.secret,
      {
        expiresIn: 1008000,
      });
      const jwtToken = `JWT ${token}`;
      res.status(200).send({
        name: data.name,
        email: data.email,
        phone: data.phone,
        language: data.language,
        currency: data.currency,
        timezone: data.timezone,
        image: data.image,
        idToken: jwtToken,
      });
    }
  });
});

module.exports = router;
