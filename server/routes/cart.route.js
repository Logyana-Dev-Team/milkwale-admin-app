const express = require("express");
const {
  addItemToCart,
  addToCart,
  getCartItems,
  removeCartItems,
  getCartItemsWithProductId
} = require("../controller/cart.controller");
const router = express.Router();

// const { requireSignin, userMiddleware } = require("../common-middleware");

router.post("/add-to-cart", addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post("/getCartItems", getCartItems);
router.post("/getCartItemsWithProductId", getCartItemsWithProductId);
// //new update
router.post("/removeItem",removeCartItems);

module.exports = router;