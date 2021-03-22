const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");

router.get("/all-user", usersController.getAllUser);
router.post("/single-user", usersController.getSingleUser);

router.post("/add-user", usersController.postAddUser);
router.post("/edit-user", usersController.postEditUser);
router.post("/delete-user", usersController.getDeleteUser);

router.post("/add-to-wishlist", usersController.addToWishlist);
router.post("/delete-from-wishlist", usersController.deleteFromWishlist);


router.post("/change-password", usersController.changePassword);

module.exports = router;
