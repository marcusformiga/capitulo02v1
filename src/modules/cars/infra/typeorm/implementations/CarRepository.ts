import { ICreateCarDto } from "@modules/cars/dto/ICreateCarDto";
import { Car } from "../entities/Car";
import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { getRepository, Repository } from "typeorm";

export class CarRepository implements ICarRepository {
  private carRepository: Repository<Car>;
  constructor() {
    this.carRepository = getRepository(Car);
  }

  async create({
    name,
    description,
    license_plate,
    fine_amount,
    dayly_rate,
    category_id,
    brand,
    specifications,
  }: ICreateCarDto): Promise<Car> {
    const car = this.carRepository.create({
      name,
      description,
      license_plate,
      fine_amount,
      dayly_rate,
      category_id,
      brand,
      specifications,
    });
    await this.carRepository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.carRepository.findOne({ where: { license_plate } });
    return car;
  }
  async findAvaliable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.carRepository
      .createQueryBuilder("cars")
      .where("is_avaliable = :is_avaliable", { is_avaliable: true });
    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.carRepository.findOne(id);
    return car;
  }
  public async updateStatus(id: string, avaliable: boolean): Promise<void> {
    const car = await this.carRepository
      .createQueryBuilder()
      .update()
      .set({ is_avaliable: avaliable })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}
