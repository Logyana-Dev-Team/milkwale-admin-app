const orderModel = require("../models/orders.model");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.productId", "pName pImages pPrice")
        .populate("user", "name phoneNumber")
        .populate("assignTo","delname")
        .sort({ updatedAt: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    // console.log(req.body.uId);
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.productId", "pName pPrice ")
          .populate("user", "name phoneNumber")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    console.log(req.body);
    let { allProduct, user, amount, address } = req.body;
    // console.log(req.body);
    // console.log(allProduct);
    if (!allProduct || !user || !amount || !address) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let orderArray = [];
        for (let i = 0; i < allProduct.length; i++) {
          orderArray.push({
            productId: allProduct[i].product._id,
            quantity: allProduct[i].quantity,
            unit:allProduct[i].unit,
            value:allProduct[i].value,
          });
        }
        console.log(orderArray)

        let newOrder = new orderModel({
          allProduct: orderArray,
          user,
          amount,
          address,
        });
        let save = await newOrder.save();
        console.log(save)
        if (save) {
          return res.json({ success: "Order created successfully" });
        }
      } catch (error) {
        return res.json({ error: error });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status, assignTo } = req.body;
    // console.log(req.body);
    if (!oId || !status || !assignTo) {
      return res.json({ message: "All filled must be required" });
    } else {
      await orderModel
        .findByIdAndUpdate(
          { _id: oId },
          {
            status: status,
            assignTo: assignTo,
          },
          { new: true }
        )
        .exec((err, result) => {
          if (err) return err;
          return res.json({ success: "Order updated successfully" });
        });
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
