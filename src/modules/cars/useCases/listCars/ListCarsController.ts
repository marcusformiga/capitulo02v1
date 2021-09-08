import { Request, Response } from "express";
import { ListCarsUseCases } from "./ListCarsUseCases";
import { container } from "tsyringe";

export class ListCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;
    const listCarsUseCases = container.resolve(ListCarsUseCases);
    const cars = await listCarsUseCases.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });
    return response.json(cars);
  }
}
