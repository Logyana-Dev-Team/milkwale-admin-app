const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const subpackSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    // pDescription: {
    //   type: String,
    //   required: true,
    // },
    // pPrice: {
    //   type: Number,
    //   required: true,
    // },
    pSold: {
      type: Number,
      default: 0,
    },
    pCredits: {
      type: Number,
      default: 0,
    },
    pCategory: {
      type: ObjectId,
      ref: "categories",
    },
    pProduct: {
        type: ObjectId,
        ref: "products",
      },
    // pImages: {
    //   type: Array,
    //   required: true,
    // },
    pOffer: {
      type: Number,
      default: 0,
    },
    // pRatingsReviews: [
    //   {
    //     review: String,
    //     user: { type: ObjectId, ref: "users" },
    //     rating: String,
    //     createdAt: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //   },
    // ],
    // pStatus: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const subpackModel = mongoose.model("subpacks", subpackSchema);
module.exports = subpackModel;
