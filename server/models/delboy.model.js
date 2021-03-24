const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const delboySchema = new mongoose.Schema(
  {
    delname: {
      type: String,
      required: true,
    },
    delphone: {
      type: String,
      required: true,
    },
    delpassword: {
      type: String,
      required: true,
    },
    delCurrentOrders: [
      {
        orderId: { type: ObjectId, ref:'orders'},
        status: String,
      }
    ],
    delCurrentSubOrders: [
      {
        orderId: { type: ObjectId, ref:'subscription' },
        status: String,
      }
    ],
  },
  { timestamps: true }
);

const delboyModel = mongoose.model("delboy", delboySchema);
module.exports = delboyModel;
