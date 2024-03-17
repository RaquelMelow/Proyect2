const User = require("../models/user.model");
const mongoose = require("mongoose");
const createError = require("http-errors");
const { sessions } = require("../middlewares/auth.middleware");

module.exports.register = (req, res, next) => res.render("users/register");

module.exports.doRegister = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res
          .status(409)
          .render("users/register", {
            user: req.body,
            errors: { email: "This email already exists" },
          });
      } else {
        const user = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        };
        return User.create(user).then(() => {
          res.redirect("/login");
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("users/register", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => res.render("users/login");

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .render("users/login", {
            user: req.body,
            errors: { password: "Email or password is invalid" },
          });
      } else {
        return user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.redirect("/");
          } else {
            res
              .status(401)
              .render("users/login", {
                user: req.body,
                errors: { password: "Email or password is invalid" },
              });
          }
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.clearCookie("connect.sid");
  res.redirect("/");
};

module.exports.profile = (req, res, next) => {
  User.findById(req.params.idUser)
    .then((user) => {
      res.render("users/profile", { user: user });
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(createError(404, "User not found"));
      } else if (userId != req.user.id) {
        next(createError(403, "Forbidden"));
      } else {
        return User.deleteOne({ _id: userId });
      }
    })
    .then(() => res.redirect("/"))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const userId = req.params.idUser;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .render("users/edit", { message: "User not found" });
      } else if (userId != req.user.id) {
        return res.status(403).render("users/edit", { message: "Forbidden" });
      }
      return user;
    })
    .then((user) => {
      res.render("users/edit", { user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).render("users/edit", {
          message: "Validation errors",
          errors: error.errors,
          user: req.body,
        });
      } else {
        next(error);
      }
    });
};

module.exports.doEdit = (req, res, next) => {
  const userId = req.user.id;

  User.findByIdAndUpdate(userId, req.body, { runValidators: true })
    .then((user) => {
      if (!user) {
        next(createError(404, "User not found"));
      } else if (userId != req.user.id) {
        next(createError(403, "Forbidden"));
      } else {
        res.redirect("/profile");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("users/profile", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};
