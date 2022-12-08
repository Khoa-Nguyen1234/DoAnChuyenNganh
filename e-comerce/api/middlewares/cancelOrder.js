const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req,res,next) => {
    const cancelId = req.params.cancel;

    if (!cancelId) {
        return res.status(403).send({message: "No Token provided."});
    }

    jwt.verify(cancelId, config.secret, (err, decoded) => {
        if(err) {
            console.log(err);
            return res.status(401).send({message: "wrong token."});
        }
        req.orderId = decoded.id;
        next();
    })
}


const checkoutAuth = {
    verifyToken,
}

module.exports = checkoutAuth;