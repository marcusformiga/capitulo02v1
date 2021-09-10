import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCases } from "./DevolutionRentalUseCases";

export class DevolutionRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { car_id } = request.params;
    const devolutionUseCases = container.resolve(DevolutionRentalUseCases);
    const rental = await devolutionUseCases.execute({ car_id, user_id: id });
    return response.status(201).json(rental);
  }
}
