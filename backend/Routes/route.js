const express = require("express");
const router = express.Router();
const controllers = require("../Conterllers/conterller");
const middleware = require("../MiddleWares/middlewarePermission");
const multerConfig = require("../MiddleWares/multer");

router.post("/signup", controllers.signup);
router.post("/login", controllers.login);
router.get("/products",middleware, controllers.getAllProducts);
router.get("/product/:id",middleware, controllers.getProductById);
router.post("/addproduct", multerConfig,middleware, controllers.createProduct);
router.patch("/product/:id",middleware, controllers.updateProduct);
router.delete("/product/:id",middleware, controllers.deleteProduct);
router.get("/getallusers", middleware,controllers.getAllUsers);
router.patch("/user/:id", middleware,controllers.deactivateUser);
router.patch("/user/:id/role", middleware,controllers.makeAdmin);
router.delete("/user/:id",middleware, controllers.deleteUser);
router.get("/user/role", middleware,controllers.getUserRole);


module.exports = router;
