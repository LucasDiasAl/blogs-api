const express = require('express');

const { userController } = require('../controllers');
const newUserVali = require('../middlewares/newUserValidation');
const JwtToken = require('../middlewares/tokenAuthori');

const router = express.Router();

router.post('', newUserVali, userController.newUser);

router.get('', JwtToken, userController.getUsers);

router.get('/:id', JwtToken, userController.getUserById);

router.delete('/me', JwtToken, userController.deleteUser);

module.exports = router;