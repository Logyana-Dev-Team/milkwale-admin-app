const express = require("express");
const router = express.Router();
const subpackController = require("../controller/subpacks.controller");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/subpacks");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-subpack", subpackController.getAllSubpack);
router.post("/subpack-by-category", subpackController.getSubpackByCategory);
// router.post("/subpack-by-price", subpackController.getSubpackByPrice);
// router.post("/wish-product", subpackController.getWishProduct);
// router.post("/cart-product", subpackController.getCartProduct);

router.post("/add-subpack",  subpackController.postAddSubpack);
router.post("/edit-subpack",  subpackController.postEditSubpack);
router.post("/delete-subpack", subpackController.getDeleteSubpack);
router.post("/single-subpack", subpackController.getSingleSubpack);

// router.post("/add-review", subpackController.postAddReview);
// router.post("/delete-review", subpackController.deleteReview);

module.exports = router;
