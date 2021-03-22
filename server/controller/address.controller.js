// const address = require("../models/address");
const userAddress = require("../models/address.model");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { payload } = req.body;
  // console.log(payload);
  if (payload.address) {
    if (payload.address._id) {
      // console.log("address working")
      userAddress
        .findOneAndUpdate(
          { user: req.body.userId, "address._id": payload.address._id },
          {
            $set: {
              "address.$": payload.address,
            },
          },
          { new: true }
        )
        .exec((error, address) => {
          if (error) return res.status(400).json({ error });
          if (address) {
            res.status(201).json({ address });
          }
        });
    } else {
      userAddress
        .findOneAndUpdate(
          { user: req.body.userId },
          {
            $push: {
              address: payload.address,
            },
          },
          { new: true, upsert: true }
        )
        .exec((error, address) => {
          if (error) return res.status(400).json({ error });
          if (address) {
            res.status(201).json({ address });
          }
        });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  // console.log(req.body)
  userAddress
    .findOne({ user: req.body.userId })
    .select("-__v")
    .exec((error, userAddress) => {
      if (error) return res.status(400).json({ error });
      if (userAddress) {
        res.status(200).json({ userAddress });
      }
    });
};

exports.singleAddress = (req, res) => {
  // console.log(req.body)
  console.log(req.body);
  userAddress
    .findOne({ user: req.body.userId })
    .select("-__v")
    .exec((error, userAddress) => {
      if (error) return res.status(400).json({ error });
      if (userAddress) {
      let getAddr=  userAddress.address.find(adr=> adr._id.toString() == req.body.addressId  )
        res.status(200).json({ getAddr });
      }
    });
};

exports.deleteAddress = async (req, res) => {
  // const { payload } = req.body;
  // console.log(payload);
  // userAddress
  //   .findByIdAndRemove({
  //     user: req.body.userId,
  //     "address._id": payload.address._id,
  //   })
  //   .exec((error, address) => {
  //     if (error) return res.status(400).json({ error });
  //     if (address) {
  //       res.status(201).json({ address });
  //     }
  //   });
  const { addressId } = req.body.payload;
  if (addressId) {
    userAddress
      .findOneAndUpdate(
        { user: req.body.userId },
        {
          $pull: {
            address: {
              _id: addressId,
            },
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
};