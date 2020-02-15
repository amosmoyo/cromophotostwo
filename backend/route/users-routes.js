const express = require('express');

const userController = require('../controllers/user-control');

const router = express.Router();

// signup user
router.route("/signup").post(userController.signupUser);

// login users
router.route("/login").post(userController.loginUser);


module.exports = router;
