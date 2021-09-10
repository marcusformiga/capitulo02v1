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
    const openByCar = await this.rentalRepository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.rentalRepository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }
  public async create({
    car_id,
    return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = this.rentalRepository.create({
      car_id,
      return_date,
      user_id,
      id,
      end_date,
      total,
    });
    await this.rentalRepository.save(rental);
    return rental;
  }
  public async findById(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne(id);
    return rental;
  }
  public async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.find({
      where: { user_id },
      relations: ["car"],
    });
    return rentals;
  }
}
