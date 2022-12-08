const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const db = require("../models");
const User = db.user;
const Role = db.role;

// verifyToken middleware will get the authorization token from header
// check that token is valid with our secret or not
// if it is valid, it will decode the token and get the user id
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No Token provided." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized." });
    }
    req.userId = decoded.id;
    next();
  });
};

// the isAdmin middleware will check if the user is admin or not
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(user.roles, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(roles);
      if (roles.name == "admin") {
        next();
        return;
      }

      res.status(403).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
