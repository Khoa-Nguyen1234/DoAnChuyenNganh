const config = require("../configs/auth.configs");
const db = require("../models");
const multer = require("multer");
var _ = require("underscore");

const mail = require("../configs/mail.configs");

const User = db.user;
const Role = db.role;
const Product = db.product;
const Size = db.size;
const Category = db.category;
const Color = db.color;
const Cart = db.cart;
const Order = db.order;
var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
const { product, order } = require("../models");

const soldItem = async (product_id, quantity) => {
  Product.findById(product_id, (err, product) => {
    if (err || !product) {
      return err;
    }
    product.sold += quantity;
    if (product.sold > product.quantity) {
      return;
    }
    product.save();
    return;
  });
};

const returnItem = async (product_id, quantity) => {
  Product.findById(product_id, (err, product) => {
    if (err || !product) {
      return err;
    }
    product.sold -= quantity;
    if (product.sold < 0) {
      return;
    }
    product.save();
    return;
  });
};

// the checkout function will create a pending order base on checkout information
// then it will send a confirmation email to user who checkout
// in that email, user can cancel the order or not
// and it will send a notification email to admin
exports.checkout = async function (req, res) {
  const order = new Order({
    createDate: Date.now(),
    totalPrice: req.body.totalPrice,
    status: "Pending",
    user: req.userId,
    product: req.body.product,
  });

  if (req.body.product.length == 0) {
    res.status(501).send({ message: "no product to check out" });
    return;
  }

  order.save(async (err, order) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }
    console.log(order._id);
    const token = jwt.sign({ id: order._id }, config.secret, {});
    order.toCancel = token;

    order.save(async (err, order) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
      User.findById(req.userId, (err, user) => {
        if (err) {
          console.log(err);
          res.status(501).send({ message: err });
          return;
        }
        const transporter = mail.transporter;
        var content = "";
        content += `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Bạn vừa đặt một đơn hàng</h4>
                            <span style="color: black">Với tổng giá trị đơn hàng là ${order.totalPrice}</span>
                            <span style="color: black">Nếu bạn muốn hủy đơn hàng của mình hãy bấm và link sau 
                            <a href="http://localhost:9000/cart/cancel/${token}">hủy đơn hàng</a></span>
                        </div>
                    </div>
                `;
        var mainOptions = {
          from: "NQH-Test nodemailer",
          to: user.username,
          subject: "Order checkout",
          text: "Your text is here",
          html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
          }
          content = `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Người dùng với username: ${user.name} vừa đặt một đơn hàng</h4>
                            <span style="color: black">Với tổng giá trị đơn hàng là ${order.totalPrice}</span>
                        </div>
                    </div>
                    `;
          mainOptions = {
            from: "NQH-Test nodemailer",
            to: "hduy10122001@gmail.com",
            subject: `Order checkout ${order._id}`,
            text: "Your text is here",
            html: content,
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
              res.status(500).send({ message: err });
              return;
            }

            Cart.findOne({ user: req.userId }, async (err, cart) => {
              if (err) {
                res.status(501).send({ message: err });
                return;
              }
              await cart.product.map(async (product) => {
                await soldItem(product.product_id, product.quantity);
              });
              cart.product = [];
              cart.totalPrice = 0;
              cart.save(async (err, cart) => {
                if (err) {
                  console.log(err);
                  res.status(502).send({ message: err });
                  return;
                }
                res.send({ message: "check out success" });
              });
            });
          });
        });
      });
    });
  });
};

exports.cancelOrder = async function (req, res) {
  Order.findById(req.orderId, (err, order) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }
    console.log(req.orderId);
    order.status = "canceled";
    order.deleteDate = Date.now();
    order.save(async (err, order) => {
      if (err) {
        console.log(err);
        res.status(501).send({ message: err });
        return;
      }
      User.findById(order.user, (err, user) => {
        if (err) {
          console.log(err);
          res.status(501).send({ message: err });
          return;
        }
        const transporter = mail.transporter;
        var content = "";
        content += `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Bạn vừa hủy thành công một đơn hàng</h4>
                            <span style="color: black">Với tổng giá trị đơn hàng là ${order.totalPrice}</span>
                        </div>
                    </div>
                `;
        var mainOptions = {
          from: "NQH-Test nodemailer",
          to: user.username,
          subject: "Order checkout",
          text: "Your text is here",
          html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
          }
          content = `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Người dùng với username: ${user.name} vừa hủy một đơn hàng</h4>
                            <span style="color: black">Với tổng giá trị đơn hàng là ${order.totalPrice}</span>
                        </div>
                    </div>
                    `;
          mainOptions = {
            from: "NQH-Test nodemailer",
            to: "",
            subject: `Order checkout ${order._id}`,
            text: "Your text is here",
            html: content,
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "cancel complete" });
          });
        });
      });
    });
  });
};
