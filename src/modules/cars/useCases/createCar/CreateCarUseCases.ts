import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  dayly_rate: number;
  description: string;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}
@injectable()
export class CreateCarUseCases {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  public async execute({
    name,
    description,
    license_plate,
    fine_amount,
    brand,
    dayly_rate,
    category_id,
  }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findByLicensePlate(
      license_plate
    );
    if (carExists) {
      throw new AppError(
        `Já existe um carro com a placa ${license_plate} cadastrada`,
        409
      );
    }
    const car = await this.carRepository.create({
      name,
      description,
      license_plate,
      fine_amount,
      brand,
      category_id,
      dayly_rate,
    });
    return car;
  }
}
