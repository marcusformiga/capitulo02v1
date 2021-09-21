import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCases } from "./SendForgotPasswordMailUseCases";

export class SendForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMailUseCases = container.resolve(
      SendForgotPasswordMailUseCases
    );
    await sendForgotPasswordMailUseCases.execute(email);
    return response.send();
  }
}
