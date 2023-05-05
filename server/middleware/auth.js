import { ErrorResponse } from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../mongodb/models/users.js";

const isAuthenticated = async (req, res, next) => {
  const headers = req.headers.authorization || req.headers.Authorization;
  
  //   Check if token exixts
  if (!headers) {
    res.status(404).json({ message: "Token not found" });
  }
  try {
    const token = headers.split(" ")[1];
    //verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    return next(res.status(401).json({ message: "User not authorized" }));
  }
};

export { isAuthenticated };
