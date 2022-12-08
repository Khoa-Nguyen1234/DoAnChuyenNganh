const config = require("../configs/auth.configs");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    
    const user = new User({
        name: req.body.name,
        username: req.body.username, 
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err,user) =>{
        if (err) {
            res.status(500).send({message:err});
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: {$in: req.body.roles}
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({message:err});
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).send({message:err});
                        return;
                    }

                    res.send({message: "Register Successfully!"});
                })
            })
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
        
                user.roles = [role._id];
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
        
                  res.send({ message: "User was registered successfully!" });
                });
            });
        }
    })
}

exports.login = (req, res) => {


    User.findOne({ 
        username: req.body.username,
    }).populate("roles","-__v").exec((err, user) => {
        if (err) {
            res.status(500).send({message:err})
        }

        if (!user) {
            return res.status(400).send(false);
        }


        var checkPass = bcrypt.compareSync(req.body.password, user.password);

        if (!checkPass) {
            return res.status(401).send({
                accessToken: null,
                message: "wrong password",
            })
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 36000,
        });

        var authorities = [];
        
        authorities.push("ROLE_" + user.roles.name.toUpperCase());
        console.log(user.roles);

        res.status(200).send({
            id: user._id,
            username: user.username,
            roles: authorities,
            accessToken: token,
        })
    })
}