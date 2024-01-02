const User = require("../schemas/users.schema");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).lean().exec();

    if (user) {
      return {
        status: "SUCCESS",
        data: user,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    console.log(error)
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};
const saveUser = async (userData) => {
  try {
    const user = new User({
      ...userData,
    });
    const savedUser = await user.save();

    if (savedUser) {
      return {
        status: "SUCCESS",
        data: savedUser,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
}


module.exports = {

  getUserByEmail,
  saveUser
  
};