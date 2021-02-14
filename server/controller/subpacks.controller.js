const subpackModel = require("../models/subpack.model");
const fs = require("fs");
const path = require("path");

class Subpack {
  // Delete Image from uploads -> products folder
  static deleteImages(images, mode) {
    var basePath = path.resolve(__dirname + '../../') + '/public/uploads/subpacks/';
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = ''
      if (mode == 'file') {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
    }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllSubpack(req, res) {
    try {
      let Subpacks = await subpackModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Subpacks) {
        return res.json({ Subpacks });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddSubpack(req, res) {
    let {
      pName,
      pProduct,
      pPrice,
      pCredits,
      pCategory,
      pOffer,
    //   pStatus,
    } = req.body;
    let images = req.files;
    // Validation
    if (
      !pName |
      !pProduct |
      !pPrice |
      !pCredits |
      !pCategory |
      !pOffer
    ) {
      Subpack.deleteImages(images, 'file');
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name 
    else if (pName.length > 255) {
      Subpack.deleteImages(images, 'file');
      return res.json({
        error: "Name must not be 255 charecter long"
      });
    }
    // Validate Images
    else if (images.length !== 2) {
      Subpack.deleteImages(images, 'file');
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newSubpack = new subpackModel({
          pImages: allImages,
          pName,
          pProduct,
          pPrice,
          pCredits,
          pCategory,
          pOffer,
        });
        let save = await newSubpack.save();
        if (save) {
          return res.json({ success: "Subpack created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditSubpack(req, res) {
    let {
      pId,
      pName,
      pProduct,
      pPrice,
      pCredits,
      pCategory,
      pOffer,
      // pStatus,
      pImages,
    } = req.body;
    let editImages = req.files;

    // Validate other fileds
    if (
      !pId |
      !pName |
      !pProduct |
      !pPrice |
      !pCredits |
      !pCategory |
      !pOffer ) {
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255) {
      return res.json({
        error: "Name must not be 255 charecter long",
      });
    } 
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
      Subpack.deleteImages(editImages, 'file');
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      let editData = {
        pName,
        pProduct,
        pPrice,
        pCredits,
        pCategory,
        pOffer
      }
      if (editImages.length == 2) {
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        }
        editData = {...editData, pImages: allEditImages};
        Subpack.deleteImages(pImages.split(','), 'string');
      }
      try {
        let editSubpack = subpackModel.findByIdAndUpdate(pId, editData);
        editSubpack.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Subpack edit successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteSubpack(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteSubpackObj = await subpackModel.findById(pId);
        let deleteSubpack = await subpackModel.findByIdAndDelete(pId);
        if (deleteSubpack) {
          // Delete Image from uploads -> Subpacks folder
          Subpack.deleteImages(deleteSubpackObj.pImages, 'string');
          return res.json({ success: "Subpack deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleSubpack(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleSubpack = await subpackModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleSubpack) {
          return res.json({ Subpack: singleSubpack });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSubpackByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let subpacks = await subpackModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (subpacks) {
          return res.json({ Subpacks: subpacks });
        }
      } catch (err) {
        return res.json({ error: "Search subpack wrong" });
      }
    }
  }

  async getSubpackByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let subpacks = await subpackModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName")
          .sort({ pPrice: -1 });
        if (subpacks) {
          return res.json({ Subpacks: subpacks });
        }
      } catch (err) {
        return res.json({ error: "Filter subpack wrong" });
      }
    }
  }

  async getWishSubpack(req, res) {
    let { subpackArray } = req.body;
    if (subpackArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishSubpacks = await subpackModel.find({
          _id: { $in: subpackArray },
        });
        if (wishSubpacks) {
          return res.json({ Subpacks: wishSubpacks });
        }
      } catch (err) {
        return res.json({ error: "Filter subpack wrong" });
      }
    }
  }

  async getCartSubpack(req, res) {
    let { subpackArray } = req.body;
    if (subpackArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartSubpacks = await subpackModel.find({
          _id: { $in: subpackArray },
        });
        if (cartSubpacks) {
          return res.json({ Subpacks: cartSubpacks });
        }
      } catch (err) {
        return res.json({ error: "Cart subpack wrong" });
      }
    }
  }

  // async postAddReview(req, res) {
  //   let { pId, uId, rating, review } = req.body;
  //   if (!pId || !rating || !review || !uId) {
  //     return res.json({ error: "All filled must be required" });
  //   } else {
  //     let checkReviewRatingExists = await productModel.findOne({ _id: pId });
  //     if (checkReviewRatingExists.pRatingsReviews.length > 0) {
  //       checkReviewRatingExists.pRatingsReviews.map((item) => {
  //         if (item.user === uId) {
  //           return res.json({ error: "Your already reviewd the product" });
  //         } else {
  //           try {
  //             let newRatingReview = productModel.findByIdAndUpdate(pId, {
  //               $push: {
  //                 pRatingsReviews: {
  //                   review: review,
  //                   user: uId,
  //                   rating: rating,
  //                 },
  //               },
  //             });
  //             newRatingReview.exec((err, result) => {
  //               if (err) {
  //                 console.log(err);
  //               }
  //               return res.json({ success: "Thanks for your review" });
  //             });
  //           } catch (err) {
  //             return res.json({ error: "Cart product wrong" });
  //           }
  //         }
  //       });
  //     } else {
  //       try {
  //         let newRatingReview = productModel.findByIdAndUpdate(pId, {
  //           $push: {
  //             pRatingsReviews: { review: review, user: uId, rating: rating },
  //           },
  //         });
  //         newRatingReview.exec((err, result) => {
  //           if (err) {
  //             console.log(err);
  //           }
  //           return res.json({ success: "Thanks for your review" });
  //         });
  //       } catch (err) {
  //         return res.json({ error: "Cart product wrong" });
  //       }
  //     }
  //   }
  // }

  // async deleteReview(req, res) {
  //   let { rId, pId } = req.body;
  //   if (!rId) {
  //     return res.json({ message: "All filled must be required" });
  //   } else {
  //     try {
  //       let reviewDelete = productModel.findByIdAndUpdate(pId, {
  //         $pull: { pRatingsReviews: { _id: rId } },
  //       });
  //       reviewDelete.exec((err, result) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         return res.json({ success: "Your review is deleted" });
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
}

const subpackController = new Subpack();
module.exports = subpackController;
