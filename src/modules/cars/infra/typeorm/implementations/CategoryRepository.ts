import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDto,
} from "../../../repositories/interfaces/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private categoryRepository: Repository<Category>;
  constructor() {
    this.categoryRepository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = this.categoryRepository.create({ name, description });
    await this.categoryRepository.save(category);
  }
  async list(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }
  async findByName(name: string): Promise<Category | undefined> {
    const categorie = await this.categoryRepository.findOne({
      where: { name },
    });
    return categorie;
  }
}
