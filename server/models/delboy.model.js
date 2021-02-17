const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const delboySchema = new mongoose.Schema(
  {
    delname: {
      type: String,
      required: true,
    },
    delphone: {
        type: Number,
        required: true,
      },
    delpassword: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const delboyModel = mongoose.model("delboy", delboySchema);
module.exports = delboyModel;
