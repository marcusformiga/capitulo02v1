import { Category } from "../../infra/typeorm/entities/Category";

import { ICategoryRepository } from "@modules/cars/repositories/interfaces/ICategoryRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  public async execute({ name, description }: IRequest) {
    const categoryExists = await this.categoryRepository.findByName(name);
    if (categoryExists) {
      throw new AppError(
        `Já existe uma categoria com o nome ${name} cadastrada`,
        409
      );
    }
    const categoryCar = await this.categoryRepository.create({
      name,
      description,
    });
    return categoryCar;
  }
}
