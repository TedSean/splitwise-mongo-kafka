const express = require('express');

const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {
  req.body.path = 'user-signup';
  kafka.makeRequest('userAuth', req.body, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 404) {
      return res.status(201).json({ errors: [{ msg: 'User with this email id already exists' }] });
    } else {
      res.status(200).send(JSON.parse(results.data));
    }
  });
});

module.exports = router;
