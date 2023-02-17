const express = require('express');

const { postController } = require('../controllers');
const JwtToken = require('../middlewares/tokenAuthori');
const newPostValidation = require('../middlewares/newPostValidation');

const router = express.Router();

router.post('', JwtToken, newPostValidation, postController.createNewPost);

router.get('', JwtToken, postController.allPosts);

module.exports = router;