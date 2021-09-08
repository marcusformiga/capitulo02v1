import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/interfaces/IRentalRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  user_id: string;
  return_date: Date;
}
@injectable()
export class CreateRentalUseCases {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider,
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  public async execute({
    car_id,
    user_id,
    return_date,
  }: IRequest): Promise<Rental> {
    // gambiarra
    const minHours = 22;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) {
      throw new AppError(
        `O Carro com id ${car_id} não está disponível para aluguel`,
        400
      );
    }
    const openRentalToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (openRentalToUser) {
      throw new AppError(
        `O Usuário com id ${user_id} não pode alugar um carro`,
        400
      );
    }
    // o aluguel deve ter duracao min de 24 horas
    const dateNow = this.dateProvider.dateNow();
    const compareDate = this.dateProvider.compareDateInHours(
      dateNow,
      return_date
    );
    console.log(compareDate);
    if (compareDate < minHours) {
      throw new AppError(
        "Um carro deve ser alugado por um periodo minímo de 24 horas",
        400
      );
    }
    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      return_date,
    });
    await this.carRepository.updateStatus(car_id, false);
    return rental;
  }
}
