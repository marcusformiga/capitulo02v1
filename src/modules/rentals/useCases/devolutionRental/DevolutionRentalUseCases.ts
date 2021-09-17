import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/interfaces/IRentalRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  user_id: string;
}
@injectable()
export class DevolutionRentalUseCases {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider
  ) {}
  public async execute({ car_id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(car_id);
    const daily_min = 1;
    const car = await this.carRepository.findById(rental.car_id);
    // verificar o tempo de aluguel e fazer calculos (verificar se teve multa etc)
    if (!rental) {
      throw new AppError(
        `Não existe aluguel para o carro de id ${car_id}`,
        404
      );
    }
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );
    if (daily <= 0) {
      daily = daily_min;
    }
    // calculo dos dias de atraso
    const daysDelayRental = this.dateProvider.compareInDays(
      dateNow,
      rental.end_date
    );
    let totalRental = 0;
    if (daysDelayRental > 0) {
      const calculate_fine = daysDelayRental * car.fine_amount;
      totalRental = calculate_fine;
    }
    totalRental += daily * car.dayly_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalRental;
    await this.rentalRepository.create(rental);
    await this.carRepository.updateStatus(car.id, true);
    return rental;
  }
}
