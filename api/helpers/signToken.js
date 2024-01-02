const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//SignToken function
const SignToken = async (user) => {
  const tokenData = {
    id: user._id,
    name: user.name,
  };

  const signedToken = await JWT.sign(tokenData, JWT_SECRET);
  return signedToken;
};
module.exports = {
  SignToken,
};
