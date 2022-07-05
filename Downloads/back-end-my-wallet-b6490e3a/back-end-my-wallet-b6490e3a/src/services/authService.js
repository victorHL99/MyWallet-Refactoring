import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import authRepository from "../repositories/authRepository.js";

async function createUser(name, email, password) {
  if (!name || !email || !password) {
    throw {
      status: 422,
      type: "MissingFields",
      message: "Missing required fields",
    };
  }

  const existingUsers = await authRepository.checkExistingUser(email);

  if (existingUsers.rowCount > 0) {
    throw {
      status: 409,
      type: "UserAlreadyExists",
      message: "User already exists",
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  await authRepository.createUser(name, email, hashedPassword);

  return {
    status: 201,
    type: "UserCreated",
    message: "User created",
  };
}

async function loginUser(email, password) {
  if (!email || !password) {
    throw {
      status: 422,
      type: "MissingFields",
      message: "Missing required fields",
    };
  }

  const { rows } = await authRepository.checkExistingUser(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw {
      status: 401,
      type: "InvalidCredentials",
      message: "Invalid credentials",
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return {
    status: 200,
    type: "UserLoggedIn",
    message: "User logged in",
    token,
  };
}

const authService = { createUser, loginUser };

export default authService;
