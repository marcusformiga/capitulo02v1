import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/ICategoryRepository";

@injectable()
export class ListCategoryUseCases {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  public async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}
