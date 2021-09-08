import { Request, Response } from "express";
import { CreateCarUseCases } from "./CreateCarUseCases";
import { container } from "tsyringe";

export class CreateCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      dayly_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
    } = request.body;
    const createCarUseCases = container.resolve(CreateCarUseCases);
    const car = await createCarUseCases.execute({
      name,
      brand,
      dayly_rate,
      fine_amount,
      description,
      license_plate,
      category_id,
    });
    return response.status(201).json(car);
  }
}
