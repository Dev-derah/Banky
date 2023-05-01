import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let err = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate  field value entered";
    error = new ErrorResponse(message, 404);
  }
  if (err.code === "ValidationError") {
    const message = Object.values(err.errors).map(val => '' + val.message);
    error = new ErrorResponse(message, 404);
  }
  res.status(error.codeStatus || 500).json({
    sucess:false,
    error:error.message || "server error"
  })
};
module.exports = errorHandler;
