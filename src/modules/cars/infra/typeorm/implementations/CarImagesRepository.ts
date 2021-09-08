import { ICarImagesRepository } from "@modules/cars/repositories/interfaces/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarsImages } from "../entities/CarsImages";

export class CarImagesRepository implements ICarImagesRepository {
  private carImagesRepository: Repository<CarsImages>;
  constructor() {
    this.carImagesRepository = getRepository(CarsImages);
  }
  public async create(car_id: string, images_car: string): Promise<CarsImages> {
    const carImage = this.carImagesRepository.create({
      car_id,
      images_car,
    });
    await this.carImagesRepository.save(carImage);
    return carImage;
  }
}
