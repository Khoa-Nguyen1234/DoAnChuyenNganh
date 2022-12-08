const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const myUrl = require("../configs/db.configs")

const db = require('../models');

const Role = db.role;



router.get("/", function(req, res, next) {
    res.send("oke");
});







function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

router.post("/register", async (req, res) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    })

    const check_user = await User.findOne({username: req.body.username}).lean();
    console.log(check_user)

    if(check_user!=[]){
        console.log("exit");
        res.status(500).send();
    }else{
        console.log("not exit");
        try {
            const savedUser = await user.save();
            return res.send("Register successfully");
        } catch (error) {
            res.json(error)
        }
    }
})


router.post("/login", async (req, res) => {
    console.log(req.body);


    const check_user = await User.findOne({username: req.body.username, password: req.body.password}).lean();
    console.log(check_user)

    if(check_user === []){
        console.log("exit");
        res.json(true);
    }else{
        console.log("not exit");
        res.json(false);
    }
})

module.exports = router;
