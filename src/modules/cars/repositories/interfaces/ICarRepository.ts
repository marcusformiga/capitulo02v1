import { ICreateCarDto } from "@modules/cars/dto/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

export interface ICarRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findById(id: string): Promise<Car | undefined>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvaliable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}
