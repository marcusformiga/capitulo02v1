import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDto,
} from "@modules/cars/repositories/interfaces/ICategoryRepository";

export class CreateCategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categories.find(
      (category) => category.name === name
    );
    return category;
  }
  async list(): Promise<Category[]> {
    const categories = await this.categories;
    return categories;
  }
  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    await this.categories.push(category);
  }
}
