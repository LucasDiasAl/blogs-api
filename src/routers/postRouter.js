const express = require('express');

const { postController } = require('../controllers');
const JwtToken = require('../middlewares/tokenAuthori');
const newPostValidation = require('../middlewares/newPostValidation');
const updateValidation = require('../middlewares/updateValidation');

const router = express.Router();

router.post('', JwtToken, newPostValidation, postController.createNewPost);

router.get('', JwtToken, postController.allPosts);

router.get('/:id', JwtToken, postController.getPostById);

router.put('/:id', JwtToken, updateValidation, postController.updateById);

router.delete('/:id', JwtToken, postController.deletePostById);

module.exports = router;