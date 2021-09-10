import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCases } from "./ListRentalUseCases";

export class ListRentalsByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentalsByUserUseCases = container.resolve(
      ListRentalsByUserUseCases
    );
    const rentals = await listRentalsByUserUseCases.execute(id);
    return response.json(rentals);
  }
}
