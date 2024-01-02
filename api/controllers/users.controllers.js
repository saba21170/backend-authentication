const UserModel = require("../models/users.models");

const bcrypt = require("bcrypt");
const { SignToken } = require("../helpers/signToken");
const { StatusCodes } = require("http-status-codes");

//User Signup
const addUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // console.log(req.body);

    const userFound = await UserModel.getUserByEmail(email);

    if (userFound.status === "SUCCESS") {
      return res.status(StatusCodes.CONFLICT).json({
        message: "EMAIL ALREADY EXISTS",
      });
    }
    //generating salt
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    const savedUser = await UserModel.saveUser(req.body);

    if (savedUser.status === "SUCCESS") {
      return res.status(StatusCodes.CREATED).json({
        message: savedUser.status,
        data: savedUser.data,
      });
    } else if (savedUser.status === "FAILED") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: savedUser.status,
        description: "User Not Saved",
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: savedUser.status,
        error: savedUser.error,
      });
    }
  } catch (error) {
   
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
    });
  }

};

//login user 
const loginUser = async (req, res, next) =>{
  try{
    const { email, password } = req.body;
    const userFound = await UserModel.getUserByEmail(email);

    if (userFound.status !== "SUCCESS") {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "INVALID USER a",
      });
    }
    const isMatch = await bcrypt.compare(password, userFound.data?.password);

    if (isMatch) {
      const signedToken = await SignToken(userFound.data);
      return res.status(StatusCodes.OK).json({
        message: "SUCCESS",
        token: signedToken,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "INVALID USER b",
      });
    }

  }catch(error){
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
    });

  }
}

//Logout User
const logoutUser = async (req, res, next) => {
  try {
  
    const { id } = req.decodedToken;

    await User.findOne({ _id: id });
    console.log(req.decodedToken);

    return res.status(StatusCodes.OK).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "SORRY: Something went wrong",
    });
  }
};



module.exports = {
    addUser,
    loginUser,
    logoutUser
  };
  