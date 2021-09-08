import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListCarsUseCases {
  constructor(
    @inject("CarRepository") private carsRepository: ICarRepository
  ) {}
  public async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvaliable(
      category_id,
      brand,
      name
    );
    return cars;
  }
}
