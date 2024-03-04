require("dotenv").config();

const logger = require('morgan');
const express = require('express');


require('./configs/db.config');
require('./configs/hbs.config');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(logger('dev'));
app.use(express.urlencoded());


app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.query = req.query;
    next();
});


const routes = require('./configs/routes.config');
app.use('/', routes);


const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));