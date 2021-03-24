const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionProduct: {
      subId: { type: ObjectId, ref: "products" }
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    address: {
      type: ObjectId, ref: "useraddress.address"
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

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);
module.exports = subscriptionModel;
