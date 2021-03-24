const delboyModel = require("../models/delboy.model");
const bcrypt = require("bcryptjs");
const orderModel = require("../models/orders.model");
const subscriptionModel = require("../models/subscription.model");

class Delboy {
  async getAllDelboy(req, res) {
    try {
      let Delboy = await delboyModel
        .find({})
        .populate("delCurrentOrders.orderId")
        .populate("delCurrentSubOrders.orderId");
      if (Delboy) {
        return res.json({ Delboy });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleDelboy(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let Delboy = await delboyModel
          .findById({ _id: uId })
          .populate("delCurrentOrders.orderId")
          .populate("delCurrentSubOrders.orderId")
          .populate({
            path: "delCurrentOrders",
            populate: {
              path: "orderId",
              populate: {
                path: "allProduct",
                  populate: { path: "productId" },
                },
              },
            
          })
          .populate({
            path: "delCurrentSubOrders",
            populate: {
              path: "orderId",
              populate: {
                path: "subscriptionProduct",
                  populate: { path: "subId" },
                },
              },
            
          });

        if (Delboy) {
          return res.json({ Delboy });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddDelboy(req, res) {
    let { delname, delphone, delpassword } = req.body;
    if (!delname | !delphone | !delpassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newDelboy = new delboyModel({
          delname,
          delphone,
          delpassword,
        });
        let save = await newDelboy.save();
        if (save) {
          return res.json({ success: "Delboy created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditDelboy(req, res) {
    let { uId, delname, delphone, delpassword } = req.body;
    console.log(req.body);

    if (!uId || !delname || !delphone || !delpassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentDelboy = delboyModel.findByIdAndUpdate(
        { _id: uId },
        {
          delname: delname,
          delphone: delphone,
          delpassword: delpassword,
          updatedAt: Date.now(),
        }
      );
      currentDelboy.exec((err, result) => {
        if (err) return err;
        return res.json({ success: "Delboy updated successfully" });
      });
    }
  }

  async getDeleteDelboy(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentDelboy = delboyModel.findByIdAndDelete({ _id: uId });
      currentDelboy.exec((err, result) => {
        if (err) return err;
        return res.json({ success: "Delboy deleted successfully" });
      });
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await delboyModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid delboy",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = delboyModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) return err;
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

  async postEditDelboyByOrder(req, res) {
    let { _id, pOrder, status, assignAction } = req.body;
    let delID;

    if (assignAction == "false") {
      delID = _id._id;
    } else {
      delID = _id;
    }
    console.log(req.body);
    if (assignAction === "false") {
      try {
        delboyModel.findByIdAndUpdate(
          { _id: delID },
          {
            $pull: {
              delCurrentOrders: { orderId: pOrder },
            },
          },
          { upsert: true, new: true },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              orderModel
                .findByIdAndUpdate(
                  { _id: pOrder },
                  {
                    $set: {
                      status: status,
                      assignTo: null,
                      assignAction: assignAction,
                    },
                  },
                  { new: true }
                )
                .exec((err, result) => {
                  if (err) return err;
                  return res.json({
                    success: "Order edit successfully",
                    result: result,
                  });
                });
              // res.json({ success: "Order edit successfully" });
              // console.log("EDiting");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        delboyModel.findByIdAndUpdate(
          { _id: delID },
          {
            $addToSet: {
              delCurrentOrders: { orderId: pOrder },
            },
          },
          { upsert: true, new: true },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              orderModel
                .findByIdAndUpdate(
                  { _id: pOrder },
                  {
                    $set: {
                      status: status,
                      assignTo: delID,
                      assignAction: assignAction,
                    },
                  },
                  { new: true }
                )
                .exec((err, result) => {
                  if (err) return err;
                  return res.json({
                    success: "Order edit successfully",
                    result: result,
                  });
                });
              // res.json({ success: "Order edit successfully" });
              // console.log("EDiting");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditDelboyBySubscriptionOrder(req, res) {
    let { _id, pSubscription, status, assignAction } = req.body;
    let delID;

    if (assignAction == "false") {
      delID = _id._id;
    } else {
      delID = _id;
    }
    console.log(req.body);
    if (assignAction === "false") {
      try {
        delboyModel.findByIdAndUpdate(
          { _id: delID },
          {
            $pull: {
              delCurrentSubOrders: { orderId: pSubscription },
            },
          },
          { upsert: true, new: true },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              subscriptionModel
                .findByIdAndUpdate(
                  { _id: pSubscription },
                  {
                    $set: {
                      status: status,
                      assignTo: null,
                      assignAction: assignAction,
                    },
                  },
                  { new: true }
                )
                .exec((err, result) => {
                  if (err) return err;
                  return res.json({
                    success: "Subscription edit successfully",
                    result: result,
                  });
                });
              // res.json({ success: "Order edit successfully" });
              // console.log("EDiting");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        delboyModel.findByIdAndUpdate(
          { _id: delID },
          {
            $addToSet: {
              delCurrentSubOrders: { orderId: pSubscription },
            },
          },
          { upsert: true, new: true },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              subscriptionModel
                .findByIdAndUpdate(
                  { _id: pSubscription },
                  {
                    $set: {
                      status: status,
                      assignTo: delID,
                      assignAction: assignAction,
                    },
                  },
                  { new: true }
                )
                .exec((err, result) => {
                  if (err) return err;
                  return res.json({
                    success: "Subscription edit successfully",
                    result: result,
                  });
                });
              // res.json({ success: "Order edit successfully" });
              // console.log("EDiting");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { _id,action } = req.body;
    console.log(req.body);

    try {
      let order = await orderModel.findById({ _id: _id });
      if (order) {
        orderModel.findByIdAndUpdate(
          { _id: _id },
          {
            $set: {
              status: action,
            },
          },
          { new: true },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              res.json({ success: "Order Delivered " });
              // console.log("EDiting");
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postUpdateCredit(req, res) {
    let { _id, credit, action } = req.body;
    console.log(req.body);
    if (action === "Delivered") {
      try {
        let subscription = await subscriptionModel.findById({ _id: _id });
        if (subscription) {
          let currCredits = subscription.credits;

          subscriptionModel.findByIdAndUpdate(
            { _id: _id },
            {
              $set: {
                credits: currCredits - credit,
                status: "Delivered",
              },
            },
            { new: true },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                res.json({ success: "Delivered Subscription" });
                // console.log("EDiting");
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let subscription = await subscriptionModel.findById({ _id: _id });
        if (subscription) {
          subscriptionModel.findByIdAndUpdate(
            { _id: _id },
            {
              $set: {
                status: "Cancelled",
              },
            },
            { new: true },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                res.json({ success: "Cancelled Subscription" });
                // console.log("EDiting");
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const ordersController = new Delboy();
module.exports = ordersController;
