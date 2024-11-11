import jwt from "jsonwebtoken";

const accessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      phone: user.phone,
    },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: "20s" }
  );
};

const refreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: "1m" }
  );
};

export default { accessToken, refreshToken };