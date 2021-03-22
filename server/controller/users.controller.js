const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ updatedAt: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select(
            "name email phoneNumber userImage updatedAt createdAt wishlist"
          )
          .populate("wishlist.productId");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new userModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }

  async addToWishlist(req, res) {
    const { userId, productId } = await req.body;
    // console.log(userId, productId);
    userModel.findById({ _id: userId }).exec((error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        let data = user.wishlist;
        const reqProduct = req.body.productId;
        let isPresent = data.find((p) => p.productId == reqProduct);
        if (isPresent) {
          return res.status(201).json({
            message: "Product-present",
          });
        }

        //put only two equals == ..therefore it will not check type

        userModel
          .findByIdAndUpdate(
            { _id: userId },
            {
              $push: {
                wishlist: { productId: productId },
              },
            },
            { new: true, upsert: true }
          )
          .exec((error, product) => {
            if (error)
              return res
                .status(400)
                .json({ error, message: "product not found" });
            if (product) {
              res.status(201).json({ product, message: "Added to Wishlist" });
            }
          });
      }
    });
  }
  async deleteFromWishlist(req, res) {
    let { productId, userId } = await req.body;
    // console.log(userId, productId);
    await userModel
      .findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            wishlist: { productId: productId },
          },
        },
        { new: true }
      )
      .exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
  }
}

const ordersController = new User();
module.exports = ordersController;
