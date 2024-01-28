const express = require("express");
const authRoute = require("./routes/auth");
require("./conn/conn");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRoute);

app.listen(1000, () => {
  console.log("The server has started!");
});
