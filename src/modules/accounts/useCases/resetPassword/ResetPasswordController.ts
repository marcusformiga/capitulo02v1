import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCases } from "./ResetPasswordUseCases";

export class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { newPassword } = request.body;
    const resetPassword = container.resolve(ResetPasswordUseCases);
    await resetPassword.execute({ token: String(token), newPassword });
    return response.status(204);
  }
}
