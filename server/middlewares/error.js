class ErrorHandler extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, resp, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const msg = `Recurso não encontrado. Invalido ${err.path}`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.code === 11000) {
    const msg = `Duplicação ${Object.keys(err.keyValue)} ao entrar`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const msg = `Json Web Token inválido. Tente novamente`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.name === "TokenExpiredError") {
    const msg = `Json web token expirou. Tente novamente`;
    err = new ErrorHandler(msg, 400);
  }

  return resp.status(statusCode).json({
    sucess: false,
    message: err.msg,
  });
};

export default ErrorHandler;
