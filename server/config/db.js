const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://logyana:logyana@clustero.sf2nu.mongodb.net/clustero?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
