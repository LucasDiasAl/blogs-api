const express = require('express');
const JwtToken = require('../middlewares/tokenAuthori');
const { categoryController } = require('../controllers');

const router = express.Router();

router.post('', JwtToken, categoryController.createCategory);

router.get('', JwtToken, categoryController.getAllCategorys);

module.exports = router;