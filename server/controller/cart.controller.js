const Cart = require("../models/cart.model");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  let { id, cartItems, action } = req.body;
  // return res.json({message:"cart working"})
  Cart.findOne({ user: id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart already exists then update cart by quantity
      const product = cartItems.product;
      const value = cartItems.value;
      let condition, update;
      // console.log(product);
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
        const val = cart.cartItems.find((c) => c.value == value);
        if (val) {
          condition = { user: id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": {
                ...cartItems,
                quantity:
                  action === "increase"
                    ? item.quantity + cartItems.quantity
                    : item.quantity - cartItems.quantity,
              },
            },
          };
        }
        else {
          condition = { user: id };
          update = {
            $push: {
              cartItems: cartItems,
            },
          };
        }
      }
      // if(item.quantity == 1 && action ==="decrease"){
      //   return res.status(201).json({ message: "Quantity cannot be zero" });
      // }
      // console.log(item);
       else {
        // console.log("push karo");
        condition = { user: id };
        update = {
          $push: {
            cartItems: cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, update, { new: true }).exec(
        (error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        }
      );
    } else {
      // console.log("creating new cart");
      //if cart not exist then create a new cart
      const cart = new Cart({
        user: id,
        cartItems: cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

// exports.addToCart = (req, res) => {
//     const { cartItems } = req.body;
//     if(cartItems){
//        if(Object.keys(cartItems).length > 0){
//            Cart.findOneAndUpdate({
//                "user": req.user._id
//            }, {
//                "cartItems": cartItems
//            }, {
//                 upsert: true, new: true, setDefaultsOnInsert: true
//            }, (error, cartItems) => {
//                if(error) return res.status(400).json({ error });
//                if(cartItems) res.status(201).json({ message: 'Added Successfully' });
//            })
//        }
//        //res.status(201).json({ cartItems });
//     }else{
//         //res.status(201).json({ req });
//     }
// }

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.body.id })
    .populate("cartItems.product")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        // console.log(cart);
        let total_cost = cart.total_cost;
        let cartItems = cart.cartItems;
        var total = cartItems.reduce((acc, item) => {
          items = item.product.pPrice * parseInt(item.value) * item.quantity;
          return acc + items;
        }, 0);
        res.status(200).json({ id: cart._id, total_cost: total, cartItems });
        // res.status(200).json({ cart });
      }
    });
  //}
};

exports.getCartItemsWithProductId = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.body.id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      let total_cost = cart.total_cost;
      let cartItems = cart.cartItems;
      var total = cartItems.reduce((acc, item) => {
        items = parseInt(item.product.price) * item.quantity;
        return acc + items;
      }, 0);
      res.status(200).json({ id: cart._id, total_cost: total, cartItems });
    }
  });
  //}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { cartItemId } = req.body.payload;
  if (cartItemId) {
    Cart.findOneAndUpdate(
      { user: req.body.userId },
      {
        $pull: {
          cartItems: {
            _id: cartItemId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
