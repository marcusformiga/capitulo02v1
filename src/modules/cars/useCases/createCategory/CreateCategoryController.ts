import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe";

export class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createCategoryUsesCases = container.resolve(CreateCategoryUseCase);
    await createCategoryUsesCases.execute({ name, description });
    return response.status(201).send();
  }
}
