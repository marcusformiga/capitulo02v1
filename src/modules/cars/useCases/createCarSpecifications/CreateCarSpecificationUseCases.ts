import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
export class CreateCarSpecificationsUseCases {
  constructor(
    private carRepository: ICarRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}
  public async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id);
    if (!carExists) {
      throw new AppError(`Não existe carro com id ${car_id}`, 404);
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );
    carExists.specifications = specifications;
    await this.carRepository.create(carExists);
    console.log(carExists);
  }
}
