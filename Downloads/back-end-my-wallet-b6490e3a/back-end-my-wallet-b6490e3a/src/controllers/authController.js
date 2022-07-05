import authService from "../services/authService.js";
import authRepository from "../repositories/authRepository.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  const resultCreateUser = await authService.createUser(name, email, password);
  res.status(resultCreateUser.status).send(resultCreateUser);
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const resultLoginUser = await authRepository.loginUser(email, password);
  res.status(resultLoginUser.status).send(resultLoginUser);
}
