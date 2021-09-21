import authConfig from "@config/authConfig";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/implementations/UsersTokensRepository";
import { UserRepository } from "@modules/accounts/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    return response.status(400).json({ error: "Token jwt não enviado" });
  }
  const [bearer, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;
    const usersRepository = new UserRepository();
    const user = await userTokensRepository.findByIdAndToken(user_id, token);
    if (!user) {
      throw new AppError(`Usuário com id ${user_id} não foi encontrado`, 404);
    }
    // sobreescrita no request do express
    request.user = {
      id: user_id,
    };
    return next();
  } catch (error) {
    throw new AppError("Unhautorized", 401);
  }
}
