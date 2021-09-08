import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionsUseCases } from "./CreateSessionsUseCases";

export class CreateSessionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSessionsUseCases = container.resolve(CreateSessionsUseCases);
    const token = await createSessionsUseCases.execute({ email, password });
    return response.status(201).json(token);
  }
}
