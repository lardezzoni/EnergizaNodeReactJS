class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
  response(res){
    res.status(this.statusCode).json({
      status: 'fail',
      data:
      {message: this.message}
  })
  }
}

module.exports = AppError;
