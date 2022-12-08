const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require('./Role');
db.product = require('./Product');
db.category = require('./Category');
db.size = require('./Size');
db.color = require('./Color');
db.gender = require('./Gender');
db.bodyPart = require('./BodyPart');
db.cart = require('./Cart');
db.order = require('./order');

db.ROLE = ['user','admin'];

module.exports = db;