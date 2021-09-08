import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarsImagesUseCases } from "./UploadCarsImagesUseCases";

interface IFiles {
  filename: string;
}
export class UploadCarsImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadImagesUseCases = container.resolve(UploadCarsImagesUseCases);
    const images_car = images.map((file) => file.filename);
    await uploadImagesUseCases.execute({
      car_id: id,
      images_car,
    });
    return response.status(201).send();
  }
}
