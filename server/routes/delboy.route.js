const express = require("express");
const router = express.Router();
const delboyController = require("../controller/delboy.controller");

router.get("/all-delboy", delboyController.getAllDelboy);
router.post("/single-delboy", delboyController.getSingleDelboy);

router.post("/add-delboy", delboyController.postAddDelboy);
router.post("/edit-delboy", delboyController.postEditDelboy);
router.post("/delete-delboy", delboyController.getDeleteDelboy);

router.post("/change-password", delboyController.changePassword);
router.post("/edit-delboy-by-order", delboyController.postEditDelboyByOrder);
router.post("/edit-delboy-by-subscription-order", delboyController.postEditDelboyBySubscriptionOrder);
router.post("/update-credit", delboyController.postUpdateCredit);
router.post("/update-order", delboyController.postUpdateOrder);




module.exports = router;
