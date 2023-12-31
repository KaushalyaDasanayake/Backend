const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/ProductRoutes");
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));
app.use("/api/products", productRouter); //Main URL

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://kaushalyadasanayake97:kaush1997@miniecomcluster.jgttflm.mongodb.net/mini_eCommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\x1b[32m%s\x1b[0m", "successfully Connected to MongoDB");
    }
  }
);

app.listen(3001, () => {
  console.log("\x1b[32m%s\x1b[0m", `server is running on port 3001`);
});

module.exports = app;
