import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUsesCases {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  public async execute({ name, description }: IRequest) {
    const specificationExists = await this.specificationRepository.findByName(
      name
    );
    if (specificationExists) {
      throw new AppError(
        `Já existe uma especificação com o nome ${name} informado`,
        409
      );
    }
    const specificationCar = await this.specificationRepository.create({
      name,
      description,
    });
  }
}
