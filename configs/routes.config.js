const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const misc = require('../controllers/misc.controller');
const events = require('../controllers/events.controller');
const ticket = require('../controllers/ticket.controller');
const info = require('../controllers/info.controller');
const order = require('../controllers/order.controller');
const pay = require('../controllers/pay.controller');

const secure = require('../middlewares/auth.middleware');
const multer = require('./multer.config')


router.get('/', misc.home);

// User CRUD
router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);
router.post('/delete', secure.isAuthenticated, users.delete);
router.get('/edit', secure.isAuthenticated, users.edit);
router.post('/edit', secure.isAuthenticated, users.doEdit);

// Events CRUD- only ADMIN
router.get('/events', secure.isAuthenticated, secure.isAdmin, events.list);
router.get('/events/create', secure.isAuthenticated, secure.isAdmin, events.create);
router.post('/events/create', secure.isAuthenticated, secure.isAdmin, multer.single('photo'), events.doCreate);
router.post('/events/:idEvent/delete', secure.isAuthenticated, secure.isAdmin, events.delete);
router.get('/events/:idEvent/edit', secure.isAuthenticated, secure.isAdmin, events.edit);
router.post('/events/:idEvent/edit', secure.isAuthenticated, secure.isAdmin, multer.single('photo'), events.doEdit);
router.get('/events/type/:eventType', events.type);


// Tickets CRUD - only ADMIN 
router.get('/ticket/:idEvent/create', secure.isAuthenticated, secure.isAdmin, ticket.create);
router.post('/ticket/:idEvent/create', secure.isAuthenticated, secure.isAdmin, ticket.doCreate);

//Events - User / with next route order-user
router.get('/events/:idEvent/details', events.details);

// Order - User
router.post('/events/:idEvent/orders', secure.isAuthenticated, order.doCreate);
router.get('/order/:idUser/list', secure.isAuthenticated, order.list);
router.get('/order/:idOrder/confirmed', secure.isAuthenticated, order.confirmed);

//Pay
router.get('/pay/:idUser', secure.isAuthenticated, pay.list);
router.get('/pay/:idUser/create', secure.isAuthenticated, pay.create);
router.post('/pay/:idUser/create', secure.isAuthenticated, pay.doCreate);
router.post('/pay/:idUser/:idPay/delete', secure.isAuthenticated, pay.doDelete);

//Ticket CRUD - User
router.get('/ticket/:idTicket/file', secure.isAuthenticated, ticket.file);

// Info- footer
router.get('/about-us', info.aboutUs);
router.get('/help', info.help);

module.exports = router;