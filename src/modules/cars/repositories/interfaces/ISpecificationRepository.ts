// dominio da nossa aplicação, representa a verdade absoluta do nosso app
import { Specification } from "../../infra/typeorm/entities/Specification";

export interface ISpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({ name, description }: ISpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
