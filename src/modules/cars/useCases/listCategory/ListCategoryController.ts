import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCases } from "../listCategory/ListCategoryUseCases";

export class ListCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUsesCases = container.resolve(ListCategoryUseCases);
    const categories = await listCategoryUsesCases.execute();
    return response.status(200).json(categories);
  }
}
