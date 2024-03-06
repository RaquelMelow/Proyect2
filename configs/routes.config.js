const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const misc = require('../controllers/misc.controller');
const secure = require('../middlewares/auth.middleware')

router.get('/', misc.home);

// User CRUD
router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);

//Events
router.get('/event/create', secure.isAuthenticated, secure.isAdmin, events.create);
router.post('/event/create', secure.isAuthenticated, secure.isAdmin, events.doCreate);



module.exports = router;