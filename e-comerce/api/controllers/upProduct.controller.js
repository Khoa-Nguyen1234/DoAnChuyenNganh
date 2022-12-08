const config = require("../configs/auth.configs");
const db = require("../models");
const cloudinary = require("../middlewares/cloudinary")


const User = db.user;
const Role = db.role;
const Product = db.product;
const Size = db.size;
const Category = db.category;
const Color = db.color;
const Gender = db.gender;
const BodyPart = db.bodyPart;

var jwt = require("jsonwebtoken");
const { product } = require("../models");

const createCategory = async (req,res, next) => {
    cate = new Category({
      name: req.body.category,
    });
    cate.save((err,cate) =>{
      if (err) {
          res.status(500).send({message:err});
          return;
      }
      Gender.findOne({
        _id: req.body.gender
    }, (err, gender) => {
        if (err) {
            res.status(500).send({message:err});
            return;
        }
  
        cate.gender = gender._id;
        console.log(gender);
        cate.save((err,cate) => {
            if (err) {
                res.status(500).send({message:err});
                return;
            }
  
            BodyPart.findOne({
              _id: req.body.part,
            }, (err, body) => {
              if (err) {
                res.status(500).send({message:err});
                return;
              }
              cate.bodyPart = body._id;
              console.log(body);
              cate.save(err => {
                if (err) {
                    res.status(500).send({message:err});
                    return;
                }
      
                next();
                return cate;
            })
            })
        })
    })
    });
  }

exports.upload = async (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        gender: req.body.gender,
        bodyPart: req.body.part,
        createDate: Date.now(),
        category: req.body.category,
        sold: 0,
        active: true,
    });
    
    if (Array.isArray(req.body.size)) {
        product.size = req.body.size.map(size => size);
    } else {
        product.size = req.body.size;
    }
    if (Array.isArray(req.body.color)) {
        product.color = req.body.color.map(color => color);
    } else{
        product.color = req.body.color;
    }
    

    product.save(async(err,product) =>{
        if (err) {
            console.log(err);
            res.status(500).send({message:err});
            return;
        }
        if (req.files) {
            let multiplePicturePromise = req.files.map((picture) =>
                cloudinary.uploader.upload(picture.path)
            );
            let imageResponses = await Promise.all(multiplePicturePromise);


            const path_array = imageResponses.map(picture => picture.url);
            console.log(path_array);
            product.photos = path_array;
            
            product.save(err => {
                if (err) {
                    res.status(507).send({message:err});
                    return;
                }

                res.send({message: "Upload product successfully!"});
            })

        } else {
            res.send({ message: "Upload product successfully!" });
        }
    });
}

exports.getInput = async (req, res, next) => {
    const sizeInput = await Size.find().lean();
    const colorInput = await Color.find().lean();
    const genderInput = await Gender.find().lean();
    const partInput = await BodyPart.find().lean();
    const cateInput = await Category.find().lean();
    res.send({ 
        size: sizeInput,
        color: colorInput,
        gender: genderInput,
        part: partInput,
        category: cateInput
    });
}