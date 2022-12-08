var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var nodemon = require('nodemon');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var testDB = require('./routes/testDB');

const db = require('./models');
const bodyParser = require('body-parser');
const myUrl = require("./configs/db.configs");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter);
app.use('/users', usersRouter);
app.use('/testDB', testDB);
require('./routes/auth.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/browseClothes.routes')(app);
require('./routes/cart.routes')(app);

const Category = db.category;
const BodyPart = db.bodyPart;
const Gender = db.gender;

app.post('/test', (req, res) => {
  console.log(req.body);
  res.send("cac");
})

// app.post('/category', async (req,res) => {
//   cate = new Category({
//     name: req.body.name,
//   });
//   cate.save((err,cate) =>{
//     if (err) {
//         res.status(500).send({message:err});
//         return;
//     }
//     Gender.findOne({
//       name: req.body.gender
//   }, (err, gender) => {
//       if (err) {
//           res.status(500).send({message:err});
//           return;
//       }

//       cate.gender = gender._id;
//       console.log(gender);
//       cate.save((err,cate) => {
//           if (err) {
//               res.status(500).send({message:err});
//               return;
//           }

//           BodyPart.findOne({
//             name: req.body.bodyPart,
//           }, (err, body) => {
//             if (err) {
//               res.status(500).send({message:err});
//               return;
//             }
      
//             cate.bodyPart = body._id;
//             console.log(body);
//             cate.save(err => {
//               if (err) {
//                   res.status(500).send({message:err});
//                   return;
//               }
    
//               res.send({message: "cate Successfully!"});
//           })
//           })
//       })
//   })
//   });
// });
// Connec MONGO DB 
mongoose.connect(myUrl.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 501);
  res.render('error');
});

module.exports = app;
