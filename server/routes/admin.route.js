const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const { loginCheck, isAuth } = require("../middleware/auth");

router.post("/isadmin", adminController.isAdmin);
router.post("/signup", adminController.postSignUp);
router.post("/signin", adminController.postSignIn);
// router.post("/user", loginCheck, isAuth, isAdmin, adminController.allUser);

module.exports = router;
