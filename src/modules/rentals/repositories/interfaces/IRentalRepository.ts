import { ICreateRentalDto } from "@modules/rentals/dto/ICreateRentalDto";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDto): Promise<Rental>;
}
