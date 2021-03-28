const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { checkAuth } = require('../utils/passport');
const kafka = require('../kafka/client');
const config = require('../utils/config');

const router = express.Router();

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const userImageUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_BUCKET_NAME,
    key(req, file, cb) {
      // cb(null, "ProfilePictures/Customer/" + req.body.emailId + ".jpg");
      cb(
        null,
        `userImages/${req.body.email}_${Date.now()}${file.originalname}`,
      );
    },
  }),
});

router.get('/:email', checkAuth, (req, res) => {
  console.log('Inside Profile Get Request');
  console.log(req.body);

  req.body.path = 'user-get-profile';
  req.body.params = req.params.email;

  kafka.makeRequest('userProfile', req.body, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else if (results.status === 404) {
      return res.status(201).json({ errors: [{ msg: 'System Error' }] });
    } else {
      res.status(200).send(JSON.parse(results.data));
    }
  });
});

router.put('/updateProfileDetails', checkAuth, (req, res) => {
  console.log('Inside Profile Put Request');
  console.log(req.body);
  req.body.path = 'user-update-profile';

  kafka.makeRequest('userProfile', req.body, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
      res.status(200).send(JSON.parse(results.data));
    }
  });
});

router.put(
  '/updateProfileImage',
  checkAuth,
  userImageUpload.single('image'),
  (req, res) => {
    console.log('Inside Update Profile Image Request');

    req.body.path = 'user-update-profile-image';
    if (req.file) {
      console.log('New User Profile Image: ', req.file);
      req.body.fileUrl = req.file.location;
    }
    console.log(req.body);

    kafka.makeRequest('userProfile', req.body, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
        res.status(200).send(JSON.parse(results.data));
      }
    });
  },
);

module.exports = router;
