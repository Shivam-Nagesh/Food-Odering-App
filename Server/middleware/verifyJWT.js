import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    return res.status(403).json({ message: "Unautherized" });

  const accessToken = authorizationHeader.split("Bearer ")[1];

  if (!accessToken || accessToken === "undefined") {
    console.log("accessToken === 'undefined'");
    return res.status(403).json({ message: "Forbidden" });
  }

  jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET, async (error, decoded) => {
    if (error) return res.status(403).json({ message: "Forbidden" });

    // assuming there will be moredata than the accessToken in auth like 'email', 'fullname', '_id', (role) in other applications or later could have done resturantAdmin / Customer
    req.accessToken = decoded;
  });

  next();
};

export default verifyJWT;