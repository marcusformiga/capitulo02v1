import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateRentalUseCases } from "./CreateRentalUseCases";

export class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { return_date, car_id } = request.body;
    const createRentalUseCases = container.resolve(CreateRentalUseCases);
    const rental = await createRentalUseCases.execute({
      car_id,
      user_id: id,
      return_date,
    });
    return response.status(201).json(rental);
  }
}
