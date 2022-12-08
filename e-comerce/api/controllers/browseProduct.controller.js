const config = require("../configs/auth.configs");
const db = require("../models");
const multer = require('multer');


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
const { rest } = require("underscore");

exports.allProduct = async function (req, res){
    const category = req.params.category == 'all' ? "all" : req.params.category;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 7;
    const inStock = req.query.inStock ? parseInt(req.query.inStock) : null ;
    const sortBy = req.query.sort ? parseInt(req.query.sort) : 0;
    const toSort =[['sold', -1], ['name',1], ['price',-1]];
    const reqQuery = { ...req.query };

    const removeFields = ["sort", "page", "perPage", "inStock"];
  
    removeFields.forEach((val) => delete reqQuery[val]);

    console.log(reqQuery);

    const totalPage = await Product.find({active: true, ...reqQuery}).countDocuments();
    let result = await Product.find({active: true, ...reqQuery}).skip((page-1)*perPage).limit(perPage).sort([[toSort[sortBy][0], toSort[sortBy][1]]]).lean();
    if (inStock!=null){
        result = inStock == 1 ? result.filter(product => product.sold<product.quantity) : result.filter(product => product.sold==product.quantity);
    }
    const product = result.map(product => ({_id: product._id, photos: product.photos, name: product.name, quantity: product.quantity, price: product.price, sold: product.sold}));
    res.send({product, totalPage: Math.ceil(totalPage/perPage)});
    return;
}

exports.productPage = async (req, res) => {
    const product_id = req.params.product_id;
    Product.findById(product_id).lean().then(async (product) => {
        if(!product) {
            res.status(404).send({message:"product not found"});
        }
        const size = await Size.find().lean();
        const color = await Color.find().lean();

        const availableSize = product.size.map(t1 => ({size_id: t1, ...size.find(t2 => t2._id == String(t1))}));
        const availableColor = product.color.map(t1 => ({color_id: t1, ...color.find(t2 => t2._id == String(t1))}));
        res.send({
            availableSize: availableSize,
            availableColor: availableColor,
            product: product,
        })
    })
}

exports.filter = async (req, res) => {
    const color = await Color.find().lean();
    const size = await Size.find().lean();

    res.send({color, size});
}

exports.category = async (req, res) => {
    const gender = await Gender.find().lean();
    const bodyPart = await BodyPart.find().lean();
    const category = await Category.find().lean();

    const newBP = bodyPart.map(item => ({bp_id: item._id, bp: item.name, gender_id: (item.gender).toString()}));
    const newCate = category.map(item => ({cate_id: item._id, cate: item.name, gender_id: item.gender, bp_id: item.bodyPart}));
    const result1 = gender.map(item => ({gender: item.name, gender_id: item._id, bodyPart: newBP.filter(item1 => (item1.gender_id.includes(item._id.toString())))}));
    res.send({result: result1});
}


exports.getIdGenderPart = async (req, res) => {
    let result ={gender: null, bodyPart: null};
    const genderName= req.query.gender || null;
    const partName = req.query.bodyPart || null;
    if(genderName) {
        const gender = await Gender.findOne({name: genderName}).lean();
        result.gender = gender?._id || null;
    }
    if(partName) {
        const bodyPart = await BodyPart.findOne({name: partName}).lean();
        result.bodyPart = bodyPart?._id || null;
    }

    res.send(result);
}

exports.getNothing = (req, res) => {
    res.send({message: "oke"});
}