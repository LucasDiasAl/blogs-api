const express = require('express');

const { userController } = require('../controllers');
const newUserVali = require('../middlewares/newUserValidation');

const router = express.Router();

router.post('', newUserVali, userController.newUser);

module.exports = router;