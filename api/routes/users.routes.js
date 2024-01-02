const express = require("express");
const {addUser,loginUser, logoutUser} = require("../controllers/users.controllers");
const { authentication } = require("../middlewares/authentication.middleware");

const userRouter = express.Router();

//Register User
userRouter.post("/",addUser);
//Login User
userRouter.get("/login", loginUser);
// Logout User
userRouter.post("/logout", authentication,  logoutUser);




module.exports = {
    userRouter,
  };