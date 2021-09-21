import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokensUseCases } from "./RefreshTokensUseCases";

export class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;
    const refreshTokenUseCases = container.resolve(RefreshTokensUseCases);
    const refreshToken = await refreshTokenUseCases.execute(token);
    return response.json(refreshToken);
  }
}
