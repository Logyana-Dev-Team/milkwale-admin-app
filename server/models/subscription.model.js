const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionProduct: {
      id: { type: ObjectId, ref: "products" }
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },

    // amount: {
    //   type: Number,
    //   required: true,
    // },
    // transactionId: {
    //   type: String,
    //   required: true,
    // },
    address: {
      type: String,
      required: true,
    },
    morningTime: {
      type: String,
      required: true,
    },
    eveningTime: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: Number,
    //   required: true,
    // },
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

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);
module.exports = subscriptionModel;
