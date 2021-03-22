const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
   
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      default: 1, 
      // By default 0 for customer signup
      // 1 for admin signup
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    userImage: {
      type: String,
      default: "user.png",
    },
    verified: {
      type: String,
      default: false,
    },
    secretKey: {
      type: String,
      default: null,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("adminmodel", adminSchema);
module.exports = adminModel;
