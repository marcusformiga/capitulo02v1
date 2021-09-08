import { ICreateRentalDto } from "@modules/rentals/dto/ICreateRentalDto";
import { IRentalRepository } from "@modules/rentals/repositories/interfaces/IRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalRepository implements IRentalRepository {
  rentalRepository: Repository<Rental>;
  constructor() {
    this.rentalRepository = getRepository(Rental);
  }
  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.rentalRepository.findOne({ car_id });
    return openByCar;
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.rentalRepository.findOne({ user_id });
    return openByUser;
  }
  public async create({
    car_id,
    return_date,
    user_id,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = this.rentalRepository.create({
      car_id,
      return_date,
      user_id,
    });
    await this.rentalRepository.save(rental);
    return rental;
  }
}
