const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const route = require("./routes");
const cors=require("cors")

app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Listening in assigned port..");
    })
  )
  .catch((err) => console.log(err));

app.use("/api", route);
