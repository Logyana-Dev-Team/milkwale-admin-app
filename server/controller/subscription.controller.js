const subscriptionModel = require("../models/subscription.model");

class Subscription {
  async getAllSubscriptions(req, res) {
    try {
      let Subscription = await subscriptionModel
        .find({})
        .populate("subscriptionProduct.id", "pName pImages pPrice")
        .populate("user", "name phone userImage")
        .sort({ updatedAt : -1 });
      if (Subscription) {
        return res.json({ Subscription });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSubscriptionByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Subscription = await subscriptionModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Subscription) {
          return res.json({ Subscription });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateSubscription(req, res) {
    // let { allProduct, user, amount, transactionId, address, phone } = req.body;

    if (!req.body) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newSubscription = new subscriptionModel({
          subscriptionProduct: req.body.subscriptionProduct,
          credits: req.body.credits,
          quantity: req.body.quantity,
          address: req.body.address,
          morningTime: req.body.morningTime,
          eveningTime: req.body.eveningTime,
          package: req.body.package,
          user: req.body.user,
          status: req.body.status,
        });
        let save = await newSubscription.save();
        if (save) {
          return res.json({ success: "Subscription created successfully" });
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async postUpdateSubscription(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentSubscription = subscriptionModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentSubscription.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Subscription updated successfully" });
      });
    }
  }

  async postDeleteSubscription(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteSubscription = await subscriptionModel.findByIdAndDelete(oId);
        if (deleteSubscription) {
          return res.json({ success: "Subscription deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const subscriptionController = new Subscription();
module.exports = subscriptionController;
