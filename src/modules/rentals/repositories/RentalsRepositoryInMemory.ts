import { ICreateRentalDto } from "../dto/ICreateRentalDto";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalRepository } from "./interfaces/IRentalRepository";

export class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];
  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  public async create({
    car_id,
    user_id,
    return_date,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      return_date,
      start_date: new Date(),
    });
    return rental;
  }
  public async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }
}
