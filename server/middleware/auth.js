import { ErrorResponse } from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../mongodb/models/users.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //Check if token exixts
  if (!token) {
    return next(
      new ErrorResponse("Not Unauthorized to access this route", 401)
    );
  }
  try {
    //verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    return next(
      new ErrorResponse("Not Unauthorized to access this route", 401)
    );
  }
};


export {isAuthenticated}