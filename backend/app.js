const express = require("express");
const authRoute = require("./routes/auth");
const listRoute = require("./routes/list");
require("./conn/conn");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRoute);
app.use("/api/v2", listRoute);

app.listen(1000, () => {
  console.log("The server has started!");
});
