import { catchAsyncError } from './catchAsyncError.js';
import { ErrorHandler } from './error.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const isAuth = catchAsyncError(async(req, resp, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Usuário não autorizado', 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
});

