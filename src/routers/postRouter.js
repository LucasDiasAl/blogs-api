const express = require('express');

const { postController } = require('../controllers');
const JwtToken = require('../middlewares/tokenAuthori');
const newPostValidation = require('../middlewares/newPostValidation');

const router = express.Router();

router.post('', JwtToken, newPostValidation, postController.createNewPost);

module.exports = router;