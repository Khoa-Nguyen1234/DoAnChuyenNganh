const { ROLE } = require('../models');
const db = require('../models');
const ROLES = db.ROLE;
const User = db.user

checkExistEmail = (req, res, next) => {
    
    User.findOne({ 
        username: req.body.username,
    }).exec((err,user) => {
        if (err) {
            
            res.status(515).send({message: err});
            return;
        }
        if (user) {
            res.status(400).send({message: "Failed! username is exist!"});
            return;
        }
        

        next();
    })
}

checkRoleExist = (req, res, next) => {
    if(req.body.roles){
        
            if(!ROLE.includes(req.body.roles)){
                res.status(400).send({message: `Failed! Role ${req.body.roles[i]} does not exist!`});
                return;
            
        }
    }

    next();
}

const verifyRegister = {
    checkExistEmail,
    checkRoleExist
  };
  
  module.exports = verifyRegister;
  