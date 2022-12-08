const auth = require("../middlewares/authJwt");
const controller = require("../controllers/cart.controller");
const checkout = require("../controllers/checkout.controller");
const checkoutAuth = require("../middlewares/cancelOrder");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
        next();
    })

    app.post('/cart/add',[auth.verifyToken], controller.addProduct);
    app.put('/cart/delete/:product_id',[auth.verifyToken], controller.removeProduct);
    app.put('/cart/increase/:product_id',[auth.verifyToken], controller.increaseProduct);
    app.put('/cart/decrease/:product_id',[auth.verifyToken], controller.decreaseProduct);
    app.post('/cart/checkout',[auth.verifyToken],checkout.checkout);
    app.get('/cart/',[auth.verifyToken],controller.getCart);
    app.get('/cart/cancel/:cancel',[checkoutAuth.verifyToken],checkout.cancelOrder);
    
}