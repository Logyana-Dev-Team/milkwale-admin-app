const express = require("express");
// const { requireSignin, userMiddleware } = require('../common-middleware');
const {
  addAddress,
  getAddress,
  deleteAddress,
  singleAddress
} = require("../controller/address.controller");
const router = express.Router();

router.post("/create", addAddress);
router.post("/getSingleAddress", singleAddress);
router.post("/getAllAddress", getAddress);
router.post("/delete", deleteAddress);

module.exports = router;