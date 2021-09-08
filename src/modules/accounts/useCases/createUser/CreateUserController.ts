import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCases } from "./CreateUserUseCases";

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCases);
    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });
    return response.status(201).send();
  }
}
