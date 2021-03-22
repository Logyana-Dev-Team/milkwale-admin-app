const mongoose = require("mongoose");

// C
const addressSchema = new mongoose.Schema({
  houseNo: {
    type: String,
    required:true
  },
  areaName: {
    type: String,
    // required: true,
    trim: true,
  },
  landmark: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
    // trim: true,
  },
  addressType: {
    type: String,
    enum: ["Home", "Work","Other"],
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("address", addressSchema);
module.exports = mongoose.model("userAddress", userAddressSchema);