import { Request, Response } from "express";
import { CreateSpecificationUsesCases } from "./CreateSpecificationsUseCases";
import { container } from "tsyringe";
export class CreateSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createSpecificationUsesCases = container.resolve(
      CreateSpecificationUsesCases
    );
    await createSpecificationUsesCases.execute({ name, description });
    return response.status(201).send();
  }
}
