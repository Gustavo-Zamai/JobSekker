import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  role: {
    type: String,
    required: true,
    enum: ["cliente", "empregador"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Informe um email válido"],
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isLength, "Senha deve conter pelo menos 6 caracteres"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//HASING PASSWD
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

//COMPARING PASSWD
userSchema.methods.comparePassword = async function(enteredPasswd) {
    return await bcrypt.compare(enteredPasswd, this.password)
};

//GENERATING JWT
userSchema.methods.getJWT = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model('User', userSchema);