const delboyModel = require("../models/delboy.model");
const bcrypt = require("bcryptjs");

class Delboy {
  async getAllDelboy(req, res) {
    try {
      let Delboys = await delboyModel.find({})
        .sort({ updatedAt : -1 });
      if (Delboys) {
        return res.json({ Delboys });
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
        let Delboy = await delboyModel.findById({_id:uId})
        if (Delboy) {
          return res.json({ Delboy });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddDelboy(req, res) {
    let {
        delname,delphone,delpassword
     } = req.body;
    if (
        !delname | !delphone | !delpassword
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newDelboy = new delboyModel({
          delname,delphone,delpassword
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
    let { uId, delname, delphone,delpassword } = req.body;
    console.log(req.body);

    if (!uId || !delname || !delphone || !delpassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentDelboy = delboyModel.findByIdAndUpdate({ _id:uId}, {
        delname: delname,
        delphone: delphone,
        delpassword:delpassword,
        updatedAt: Date.now(),
      });
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
      let currentDelboy = delboyModel.findByIdAndDelete({_id:uId});
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
    let { _id, pOrder } = req.body;
    console.log(req.body);

    let id = _id;
   
    try {
      delboyModel.findByIdAndUpdate(
        { _id: id },
        {
          $addToSet: {
            delCurrentOrders: pOrder,
          },
        },
        { upsert: true },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ success: "Order edit successfully" });
            // console.log("EDiting");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

}

const ordersController = new Delboy();
module.exports = ordersController;
