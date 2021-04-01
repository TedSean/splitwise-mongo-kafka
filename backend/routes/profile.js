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
      res.json({
        status: 'error',
        msg: err,
      });
    } else if (results.status === 404) {
      return res.status(201).json({ errors: [{ msg: 'System Error' }] });
    } else {
      res.status(200).send(JSON.parse(results.data));
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
    } else {
      res.status(200).send(JSON.parse(results.data));
    }
  });
});

module.exports = router;
