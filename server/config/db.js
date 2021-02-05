const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://arjunople:arjunople@projectx.mauh4.mongodb.net/projectx?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
