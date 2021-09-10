import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/interfaces/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCases {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}
  public async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalRepository.findByUser(user_id);
    return rentalsByUser;
  }
}
