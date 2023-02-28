const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfully"))
  .catch((err) => {
    console.log("no connection");
  });
