import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ISpecificationDto,
  ISpecificationRepository,
} from "@modules/cars/repositories/interfaces/ISpecificationRepository";

export class CreateSpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];
  public async create({
    name,
    description,
  }: ISpecificationDto): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);
    return specification;
  }
  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }
  public async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecifications;
  }
}
