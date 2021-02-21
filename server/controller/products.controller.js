const productModel = require("../models/products.model");
const fs = require("fs");
const path = require("path");

class Product {
  // Delete Image from uploads -> products folder
  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/uploads/products/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
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

  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ updatedAt: -1 });
      if (Products) {
        return res.json({ Products });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddProduct(req, res) {
    let {
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      pVariant,
    } = req.body;
    console.log(pVariant);
    // let newVar= JSON.parse(pVariant)
    // console.log(parsedVariant);
    console.log("working");
    let images = req.files;
    // Validation
    if (
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pCategory |
      !pOffer |
      !pStatus 
    ) {
      Product.deleteImages(images, "file");
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 4000) {
      Product.deleteImages(images, "file");
      return res.json({
        error: "Name 255 & Description must not be 4000 charecter long",
      });
    }
    // Validate Images
    // else if (images.length !== 2) {
    //   Product.deleteImages(images, "file");
    //   return res.json({ error: "Must need to provide 2 images" });
    // } 
    else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }

        let i=0;
        let allVariants=[];
for( i=0;i<pVariant.length; i++){
  allVariants.push(JSON.parse(pVariant[i]))
}
console.log(allVariants);
        // for (const item of pVariant) {
        //   allVariants.push(JSON.parse(item));
        // }

        let newProduct = new productModel({
          pImages: allImages,
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pCategory,
          pOffer,
          pStatus,
          pVariant:allVariants
        });
        let save = await newProduct.save();
        if (save) {
          return res.json({ data:save,success: "Product created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditProduct(req, res) {
    let {
      pId,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      pImages,
      pVariant,
    } = req.body;
    let editImages = req.files;

    // Validate other fileds
    if (
      !pId |
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pCategory |
      !pOffer |
      !pStatus |
      !pVariant
    ) {
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 4000) {
      return res.json({
        error: "Name 255 & Description must not be 4000 charecter long",
      });
    }
    // Validate Update Images
    // else if (editImages && editImages.length == 1) {
    //   Product.deleteImages(editImages, "file");
    //   return res.json({ error: "Must need to provide 2 images" });
    // } 
    else {
      let editData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
        pVariant,
      };
      
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        
        editData = { ...editData, pImages: allEditImages };
        Product.deleteImages(pImages.split(","), "string");
      }

      let i=0;
      let allVariants=[];
for( i=0;i<pVariant.length; i++){
allVariants.push(JSON.parse(pVariant[i]))
editData = { ...editData, pVariant: allVariants };
}
      try {


        let editProduct = productModel.findByIdAndUpdate(pId, editData);
        editProduct.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Product edit successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteProductObj = await productModel.findById(pId);
        let deleteProduct = await productModel.findByIdAndDelete(pId);
        if (deleteProduct) {
          // Delete Image from uploads -> products folder
          Product.deleteImages(deleteProductObj.pImages, "string");
          return res.json({ success: "Product deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleProduct = await productModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ Product: singleProduct });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Search product wrong" });
      }
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName")
          .sort({ pPrice: -1 });
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (productArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (wishProducts) {
          return res.json({ Products: wishProducts });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (productArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (cartProducts) {
          return res.json({ Products: cartProducts });
        }
      } catch (err) {
        return res.json({ error: "Cart product wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      let checkReviewRatingExists = await productModel.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: "Your already reviewd the product" });
          } else {
            try {
              let newRatingReview = productModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              });
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thanks for your review" });
              });
            } catch (err) {
              return res.json({ error: "Cart product wrong" });
            }
          }
        });
      } else {
        try {
          let newRatingReview = productModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thanks for your review" });
          });
        } catch (err) {
          return res.json({ error: "Cart product wrong" });
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let reviewDelete = productModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ success: "Your review is deleted" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditProductbySubpack(req, res) {
    let { pName, pOffer, pCredits, pProduct } = req.body;
    // console.log(req.body);

    let pId = pProduct;
    let data = {
      name: pName,
      offer: pOffer,
      credits: pCredits,
    };
    try {
      productModel.findByIdAndUpdate(
        { _id: pId },
        {
          $addToSet: {
            pSubpacks: data,
          },
        },
        { upsert: true },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ success: "Product edit successfully" });
          }
        }
      );
      // console.log(editProduct);
      // editProduct.exec((err) => {
      //   if (err) console.log(err);
      //   return res.json({ success: "Product edit successfully" });
      // });
    } catch (err) {
      console.log(err);
    }
  }

  
  async postEditProductbyVariant(req, res) {
    let {  _id,pVariant } = req.body;
    console.log(req.body);

    let pId = _id;
    // let data = {
    //   value: pVariant.value,
    //   unit: pVariant.unit
    // };
    try {
      productModel.findByIdAndUpdate(
        { _id : pId },
        {
          $addToSet: {
            pVariant: pVariant,
          },
        },
        { upsert: true },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ success: "Product edit successfully" });
            console.log("EDiting");
          }
        }
      );
      // console.log(editProduct);
      // editProduct.exec((err) => {
      //   if (err) console.log(err);
      //   return res.json({ success: "Product edit successfully" });
      // });
    } catch (err) {
      console.log(err);
    }
  }

}

// async getDeleteSubpack(req, res) {
//   let { pId } = req.body;
//   if (!pId) {
//     return res.json({ error: "All filled must be required" });
//   } else {
//     try {
//       let deleteProductObj = await productModel.findById(pId);
//       let deleteProduct = await productModel.findByIdAndDelete(pId);
//       if (deleteProduct) {
//         // Delete Image from uploads -> products folder
//         Product.deleteImages(deleteProductObj.pImages, 'string');
//         return res.json({ success: "Product deleted successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

const productController = new Product();
module.exports = productController;
