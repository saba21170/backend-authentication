require("dotenv").config();
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const UserModel = require("../models/users.models");

//Authentication
const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken?.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = JWT.verify(token, JWT_SECRET);
    //save in req for using in other process
    req.decodedToken = decodedToken;
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      message: "User not exist ",
    });
  }

  if (decodedToken) {
    next();
  } else {
    return res.status(403).json({
      message: "INVALID ",
    });
  }
};
module.exports = {
  authentication,
};
