const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const config = require('../utils/config');
const kafka = require('../kafka/client');
const { checkAuth } = require('../utils/passport');

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
    key: (req, file, cb) => {
      cb(
        null,
        `userImages/${req.body.email}_${Date.now()}${file.originalname}`,
      );
    },
  }),
}).single('avatar');

const groupImageUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(
        null,
        `groupImages/${req.params.groupName}_${Date.now()}${file.originalname}`,
      );
    },
  }),
}).single('groupImage');

router.get('/:userImage', (req, res) => {
  console.log('Inside user image GET request');
  // console.log('Req Body : ', req.body);
  const image = `${path.join(__dirname, '..')}/public/storage/users/${req.params.userImage}`;

  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/storage/users/userPlaceholder.png`);
  }
});

router.put(
  '/user/:userId',
  checkAuth,
  userImageUpload,
  (req, res) => {
    req.body.path = 'user-update-image';
    if (req.file) {
      req.body.fileUrl = req.file.location;
    }

    kafka.makeRequest('images', req.body, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
        res.status(200).send(results.message.avatarURL);
      }
    });
  },
);

router.put(
  '/group/:groupName',
  checkAuth,
  groupImageUpload,
  (req, res) => {
    req.body.path = 'group-update-image';
    if (req.file) {
      req.body.fileUrl = req.file.location;
    }

    kafka.makeRequest('images', req.body, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
        res.status(200).send(results.message.avatarURL);
      }
    });
  },
);

module.exports = router;
