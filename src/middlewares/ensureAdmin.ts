import { UserRepository } from "@modules/accounts/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("O usuário informado não tem permissão de admin");
  }
  return next();
}
