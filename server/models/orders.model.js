const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    allProduct: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
        unit: String,
        value: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // transactionId: {
    //   type: String,
    //   required: true,
    // },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userAddress.address",
    },
    // phone: {
    //   type: Number,
    //   required: true,
    // },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delboy",
    },
    assignAction: {
      type: String,
      default: "false",
    },

    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
