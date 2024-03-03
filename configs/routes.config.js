const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const misc = require('../controllers/misc.controller');

router.get('/', misc.home);

// User CRUD
router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);


module.exports = router;