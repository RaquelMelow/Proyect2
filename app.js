require("dotenv").config();
require('./configs/db.config');
require('./configs/hbs.config');

const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded());




const routes = require('./configs/routes.config');
app.use('/', routes);


const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));