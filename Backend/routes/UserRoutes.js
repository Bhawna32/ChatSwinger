const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const router = express.Router(); //MiddleWare router

router
.route('/signup')  //Child routes
.post(UserController.Signup)
router
.route('/login')
.post(UserController.Login)
module.exports = router;