import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDto,
} from "../interfaces/ICategoryRepository";

export class CreateCategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const categories = this.categories;
    return categories;
  }
  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = new Category();
    category.name = name;
    category.description = description;
    this.categories.push(category);
  }
}
