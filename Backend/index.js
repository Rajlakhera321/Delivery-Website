const express = require("express");
const mongoDB = require("./db");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.get("/getData", (req, res) => {
  res.send("Hello World");
});


app.use("/api/v1", require("./src/router/user"));
app.use("/api/v1/food", require("./src/router/foodItems"));
app.use("/api/v1/order", require("./src/router/order"))


app.listen(process.env.PORT, async () => {
  try {
    await mongoDB();
    console.log(`DB has been connected`);
  } catch (error) {
    console.log(`DB has not been connected`);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});