import { User } from "../models/user.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";

export const signUp = catchAsyncError(async (req, resp, next) => {
  const { name, email, password, phone, role } = req.body;
  if (!email || !password || !role || !password) {
    return next(new ErrorHandler("Por favor, preencha todos os campos."));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("E-mail já cadastrado."));
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  resp.status(200).json({
    sucess: true,
    message: "Usuário cadastrado com sucesso.",
    user,
  });

});
