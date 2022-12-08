const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/upProduct.controller");
const admin = require("../controllers/admin.controller");

const upload = require("../middlewares/uploadImage");

module.exports = function (app) {
  // routing
  // whenever client send request to /api/admin, it will be handled by admin controller
  // it should go through authJwt middleware first then admin controller
  // the authJwt middleware will check if the user is admin or not
  // or the user is logged in or not (checking by jwt)

  app.post(
    "/admin/add-product",
    [authJwt.verifyToken, authJwt.isAdmin, upload.array("productImage", 4)],
    controller.upload
  );
  app.get(
    "/admin/add-product",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getInput
  );
  app.get(
    "/admin/product",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.productManagement
  );
  app.get(
    "/admin/order",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.orderManagement
  );
  app.delete(
    "/admin/product/:product_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.deleteProduct
  );
  app.post(
    "/admin/product/:product_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.changeStock
  );
  app.post(
    "/admin/order/:order_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.updateOrder
  );
};
