class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, resp, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Recurso não encontrado. Invalido ${err.path}`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicação ${Object.keys(err.keyValue)} ao entrar`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token inválido. Tente novamente`;
    err = new ErrorHandler(msg, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json web token expirou. Tente novamente`;
    err = new ErrorHandler(msg, 400);
  }

  return resp.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};

export default ErrorHandler;
