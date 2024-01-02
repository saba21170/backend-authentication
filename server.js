const express = require("express");
const cors = require("cors");
const connectDB = require("./api/dependencies/connectDb");
const { StatusCodes } = require("http-status-codes");

const { userRouter } = require("./api/routes/users.routes");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());



app.use("/users", userRouter);

app.use("/", (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "No such route found",
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
