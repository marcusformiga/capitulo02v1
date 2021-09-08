import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ISpecificationDto,
  ISpecificationRepository,
} from "../../../repositories/interfaces/ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private specificationsRepository: Repository<Specification>;

  constructor() {
    this.specificationsRepository = getRepository(Specification);
  }

  public async create({
    name,
    description,
  }: ISpecificationDto): Promise<Specification> {
    const specification = this.specificationsRepository.create({
      name,
      description,
    });
    await this.specificationsRepository.save(specification);
    return specification;
  }
  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.specificationsRepository.findOne({
      where: { name },
    });
    return specification;
  }
  findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
}
