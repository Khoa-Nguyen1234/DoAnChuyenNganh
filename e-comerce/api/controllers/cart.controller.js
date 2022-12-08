const config = require("../configs/auth.configs");
const db = require("../models");
const multer = require("multer");
const _ = require("underscore");
const nodemailer = require("nodemailer");

const User = db.user;
const Role = db.role;
const Product = db.product;
const Size = db.size;
const Category = db.category;
const Color = db.color;
const Cart = db.cart;
const Order = db.order;

var jwt = require("jsonwebtoken");
const { product } = require("../models");

// the will check the current product of that option is in stock or not to prevent the user from adding more than the stock
exports.addProduct = async function (req, res) {
  console.log(req.userId);
  Cart.findOne({ user: req.userId }, async (err, cart) => {
    if (err) {
      res.status(501).send({ message: err });
      return;
    }
    if (!cart) {
      cart = new Cart({
        user: req.userId,
        totalPrice: 0,
      });
    }

    const a = cart.product.findIndex((element) => {
      return element.product_id == req.body.product_id;
    });

    Product.findById(req.body.product_id, (err, myProduct) => {
      if (err) {
        res.status(502).send({ message: err });
        return;
      }
      const toBuy =
        a != -1
          ? myProduct.sold + cart.product[a].quantity + req.body.quantity
          : myProduct.sold + req.body.quantity;
      if (
        a != -1 &&
        toBuy <= myProduct.quantity &&
        cart.product[a].color_id == req.body.color_id &&
        cart.product[a].size_id == req.body.size_id
      ) {
        cart.product[a].quantity += req.body.quantity;
        cart.totalPrice +=
          parseFloat(req.body.quantity) * parseFloat(req.body.price);
      } else if (toBuy <= myProduct.quantity) {
        cart.product.push({
          product_id: req.body.product_id,
          quantity: req.body.quantity,
          price: req.body.price,
          color_id: req.body.color_id,
          size_id: req.body.size_id,
        });
        cart.totalPrice +=
          parseFloat(req.body.quantity) * parseFloat(req.body.price);
      }
      cart.save((err) => {
        if (err) {
          console.log(err);
          res.status(503).send({ message: err });
          return;
        }
        res.send({ message: "Success add product" });
      });
    });
  });
};

// this will remove the product from the cart, and check if the product is in the cart or not
exports.removeProduct = async (req, res) => {
  const product_id = req.params.product_id;
  Cart.findOne({ user: req.userId }, async (err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!cart || cart.product === []) {
      res.status(500).send({ message: "The cart is empty" });
      return;
    }

    if (!cart.totalPrice) {
      cart.totalPrice = 0;
    }

    const a = cart.product.findIndex((element) => {
      return element.product_id == product_id;
    });
    console.log(cart);
    if (a != -1) {
      cart.totalPrice -=
        parseFloat(cart.product[a].quantity) *
        parseFloat(cart.product[a].price);
      cart.product.splice(a, 1);
    } else {
      res.status(500).send({ message: "Doesn't have this item in cart" });
      return;
    }
    cart.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Success remove product" });
    });
  });
};

exports.decreaseProduct = async (req, res) => {
  const product_id = req.params.product_id;
  Cart.findOne({ user: req.userId }, async (err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!cart || cart.product === []) {
      res.status(500).send({ message: "The cart is empty" });
      return;
    }

    const a = cart.product.findIndex((element) => {
      return element.product_id == product_id;
    });
    console.log(cart);
    if (a != -1 && cart.product[a].quantity >= 1) {
      cart.product[a].quantity -= 1;
      cart.totalPrice -= parseFloat(cart.product[a].price);
    } else {
      res.status(500).send({ message: "Doesn't have this item in cart" });
      return;
    }
    cart.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ result: cart.product[a].quantity });
    });
  });
};

exports.increaseProduct = async (req, res) => {
  const product_id = req.params.product_id;
  Cart.findOne({ user: req.userId }, async (err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!cart || cart.product === []) {
      res.status(500).send({ message: "The cart is empty" });
      return;
    }

    const a = cart.product.findIndex((element) => {
      return element.product_id == product_id;
    });
    if (a != -1) {
      Product.findById(product_id, (err, myProduct) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        const toIncrease = cart.product[a].quantity + 1 + myProduct.sold;
        console.log(toIncrease);
        if (toIncrease <= myProduct.quantity) {
          cart.product[a].quantity += 1;
          const result = cart.product[a].quantity;
          cart.totalPrice += 1 * parseFloat(cart.product[a].price);
          cart.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ result });
          });
        } else {
          res.status(500).send({ message: "product out of stock" });
        }
      });
    } else {
      res.status(500).send({ message: "Doesn't have this item in cart" });
      return;
    }
  });
};

exports.getCart = async (req, res) => {
  Cart.findOne({ user: req.userId })
    .lean()
    .then(async (cart) => {
      if (!cart) {
        cart = new Cart({
          user: req.userId,
        });
        res.status(501).send({ message: "empty cart" });
        return;
      } else {
        const size = await Size.find().lean();
        const color = await Color.find().lean();
        const product = await Product.find().select("_id name photos").lean();

        const a = cart.product;

        const productList = a
          .map((t1) => ({
            ...t1,
            ...color.find((t2) => t2._id == String(t1.color_id)),
          }))
          .map((t1) => ({
            ...t1,
            ...product.find((t2) => t2._id == String(t1.product_id)),
          }))
          .map((t1) => ({
            ...t1,
            ...size.find((t2) => t2._id == String(t1.size_id)),
          }));

        console.log(productList);

        res.send({
          productList: productList,
          totalPrice: cart.totalPrice,
        });
      }
    });
};
