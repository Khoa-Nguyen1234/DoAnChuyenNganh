const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/browseProduct.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
        next();
    })

    app.get('/shop/:category', controller.allProduct);
    app.get('/product/:product_id', controller.productPage);
    app.get('/filter', controller.filter);
    app.get('/category', controller.category);
    app.get('/categoryId', controller.getIdGenderPart);
    app.get('/get-nothing',[authJwt.verifyToken], controller.getNothing)
}