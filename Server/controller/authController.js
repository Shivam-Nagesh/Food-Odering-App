import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import TokenGenerator from "../utils/TokenGenerator.js";

const login = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user)    return res.status(401).json({ message: "email or password is wrong" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)   return res.status(401).json({ messgae: "email or password is wrong" });

  const accessToken = TokenGenerator.accessToken(user);
  const refreshToken = TokenGenerator.refreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax", // on get requests
    // secure: true,
    maxAge: 1 * 60 * 1000,
  });

  // since i am sending json thus underneath it is calling stringify which removes all undefined properties
  return res.json({ accessToken, user: { ...user, password: undefined } });

};

const refresh = async (req, res) => {

  const refreshToken = req.cookies?.refreshToken;
  console.log(`refreshToken in authController.js/refresh: ${refreshToken}`);
  if (!refreshToken) return res.status(401).json({ message: "Forbidden" });

  jwt.verify(
    refreshToken,
    process.env.REFRESHTOKEN_SECRET,
    async (error, decoded) => {
      if (error) {
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
        return res.status(403).json({ message: "Forbidden" });
      }

      const user = await User.findById(decoded._id);
      if (!user) return res.status(401).json({ message: "unauthorized" });

      const accessToken = TokenGenerator.accessToken(user);
      console.log("AccessToken Generated ---- authController.js/refresh  at path /auth/refresh");
      return res.status(200).json({ accessToken });
    }
  );

};

const logout = async (req, res) => {
  if (!req.cookies?.refreshToken)   return res.status(204).json({ message: "Log In inorder to Log Out" });
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
  return res.status(200).json({ message: "logged out successfully" });
};

export default { login, refresh, logout };