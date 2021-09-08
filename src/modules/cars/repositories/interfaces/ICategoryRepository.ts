// dominio da nossa aplicação, representa a verdade absoluta do nosso app
import { Category } from "../../infra/typeorm/entities/Category";

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDto): Promise<void>;
}
