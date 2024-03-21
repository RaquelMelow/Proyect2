require("dotenv").config();
const mongoose = require('mongoose')
const createError = require('http-errors');
const logger = require("morgan");
const express = require("express");

require("./configs/db.config");
require("./configs/hbs.config");

const app = express();

app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

//middlewares
const { session, loadUserSession } = require("./configs/session.config");
app.use(session);
app.use(loadUserSession);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.query = req.query;
  next();
});

const routes = require("./configs/routes.config");
app.use("/", routes);

app.use((req, res, next) => next(createError(404, 'Route not found')));

app.use((err, req, res, next) => {
  if(
    err instanceof mongoose.Error.CastError && 
    err.message.includes('_id')
    ) {
      err = createError(404, 'Resource not found');
    } else if (!err.status) {
      err = createError(500, err);
    }
  console.error(err);
  res.status(err.status).render(`errors/${err.status}`);
});

const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));
