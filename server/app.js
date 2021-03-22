/* 

================== Most Important ==================
* Issue 1 (done):
In uploads folder you need create 3 folder like bellow.
Folder structure will be like: 
public -> uploads -> 1. products 2. customize 3. categories

* Issue 2 (done):
For admin signup just go to the auth 
controller then newUser obj, you will 
find a role field. role:1 for admin signup & 
role: 0 or by default it for customer signup.
go user model and see the role field.

*/

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Router
const authRouter = require("./routes/auth.route");
const categoryRouter = require("./routes/categories.route");
const productRouter = require("./routes/products.route");
const subpackRouter = require("./routes/subpacks.route");
const delboyRouter = require("./routes/delboy.route");
const brainTreeRouter = require("./routes/braintree.route");
const orderRouter = require("./routes/orders.route");
const subscriptionRouter = require("./routes/subscription.route");
const usersRouter = require("./routes/users.route");
const customizeRouter = require("./routes/customize.route");
const cartRouter = require("./routes/cart.route");
const addressRouter = require("./routes/address.route");
const adminRouter = require("./routes/admin.route");


// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/subpack", subpackRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/delboy", delboyRouter);
app.use("/api/customize", customizeRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/admin", adminRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
