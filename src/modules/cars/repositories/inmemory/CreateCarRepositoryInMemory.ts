import { ICreateCarDto } from "@modules/cars/dto/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../interfaces/ICarRepository";
export class CreateCarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];
  public async create({
    name,
    description,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDto): Promise<Car> {
    const car = new Car();
    car.name = name;
    car.description = description;
    car.license_plate = license_plate;
    car.fine_amount = fine_amount;
    car.brand = brand;
    car.category_id = category_id;
    this.cars.push(car);
    return car;
  }
  public async findByLicensePlate(
    license_plate: string
  ): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  public async findAvaliable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars
      .filter((car) => car.is_avaliable === true)
      .filter(
        (car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );
    return cars;
  }
  public async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }
  public async updateStatus(id: string, avaliable: boolean): Promise<void> {
    const findIdex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIdex].is_avaliable = avaliable;
  }
}
