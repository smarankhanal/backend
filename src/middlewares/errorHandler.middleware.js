const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || [];

  res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
export default errorHandler;
