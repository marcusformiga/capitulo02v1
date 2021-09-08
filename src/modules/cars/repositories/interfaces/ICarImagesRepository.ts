import { CarsImages } from "@modules/cars/infra/typeorm/entities/CarsImages";

export interface ICarImagesRepository {
  create(car_id: string, images_car: string): Promise<CarsImages>;
}
