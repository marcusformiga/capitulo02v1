import { ICarImagesRepository } from "@modules/cars/repositories/interfaces/ICarImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_car: string[];
}
@injectable()
export class UploadCarsImagesUseCases {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}
  public async execute({ car_id, images_car }: IRequest): Promise<void> {
    images_car.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
