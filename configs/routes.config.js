const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const misc = require('../controllers/misc.controller');
const secure = require('../middlewares/auth.middleware');
const events = require('../controllers/events.controller');


router.get('/', misc.home);

// User CRUD
router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);

// Events CRUD- only ADMIN
router.get('/events', secure.isAuthenticated, secure.isAdmin, events.list);
router.get('/events/create', secure.isAuthenticated, secure.isAdmin, events.create);
router.post('/events/create', secure.isAuthenticated, secure.isAdmin, events.doCreate);
router.post('/events/:idEvent/delete', secure.isAuthenticated, secure.isAdmin, events.delete);




module.exports = router;